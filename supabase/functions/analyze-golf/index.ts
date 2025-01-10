import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { cleanAndValidateJSON } from '../_shared/responseUtils.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function callAnthropicWithRetry(prompt: string, data: any, retryCount = 0): Promise<string> {
  try {
    console.log(`Attempting Anthropic API call, attempt ${retryCount + 1} of ${MAX_RETRIES}`);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${prompt}\n\nYou MUST respond with a valid JSON object. Do not include any markdown formatting, code blocks, or explanatory text. The response must be directly parseable by JSON.parse().\n\nHere is the transcription to analyze:\n${JSON.stringify(data)}\n\nRemember: Your entire response must be a single, valid JSON object.`
          }
        ],
        temperature: 0.7,
        system: "You are an expert golf analysis AI. You must always respond with valid JSON that can be parsed by JSON.parse(). Never include explanations or markdown - only pure JSON."
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      
      // Check if it's an overloaded error and we haven't exceeded max retries
      if (error.includes('overloaded_error') && retryCount < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return callAnthropicWithRetry(prompt, data, retryCount + 1);
      }
      
      throw new Error(`Anthropic API error: ${error}`);
    }

    const result = await response.json();
    return result.content[0].text;
  } catch (error) {
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Error occurred, retrying in ${RETRY_DELAY}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return callAnthropicWithRetry(prompt, data, retryCount + 1);
    }
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcription } = await req.json();
    console.log('Analyzing transcription:', { length: transcription.length });

    if (!transcription) {
      throw new Error('No transcription provided');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the analysis prompt
    const { data: promptData, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt')
      .single();

    if (promptError) {
      console.error('Error fetching prompt:', promptError);
      throw promptError;
    }

    if (!promptData?.prompt) {
      console.error('No prompt configuration found');
      throw new Error('No prompt configuration found');
    }

    console.log('Using prompt configuration:', { promptLength: promptData.prompt.length });

    // Get analysis from Anthropic with retry logic
    const rawAnalysis = await callAnthropicWithRetry(promptData.prompt, transcription);
    
    // Log the raw response for debugging
    console.log('Raw analysis response:', rawAnalysis);
    
    try {
      // First try parsing the raw response
      JSON.parse(rawAnalysis);
      console.log('Raw response is valid JSON');
      return new Response(
        JSON.stringify({ analysis: rawAnalysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.log('Raw response is not valid JSON, attempting cleanup');
      // If direct parsing fails, try cleaning the response
      const cleanedAnalysis = cleanAndValidateJSON(rawAnalysis);
      console.log('Cleaned analysis:', cleanedAnalysis);

      return new Response(
        JSON.stringify({ analysis: cleanedAnalysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in analyze-golf function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        details: 'If this error persists, please try again in a few moments.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});