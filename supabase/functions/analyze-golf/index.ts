import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function cleanMarkdownFormatting(text: string): string {
  // Remove markdown code block syntax
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // Trim any whitespace
  cleaned = cleaned.trim();
  // If the response starts with a newline, remove it
  cleaned = cleaned.replace(/^\n+/, '');
  // If there are any trailing newlines, remove them
  cleaned = cleaned.replace(/\n+$/, '');
  return cleaned;
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

    // Get analysis from Anthropic using Claude
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${promptData.prompt}\n\nYou MUST respond with a valid JSON object. Do not include any markdown formatting, code blocks, or explanatory text. The response must be directly parseable by JSON.parse().\n\nHere is the transcription to analyze:\n${transcription}\n\nRemember: Your entire response must be a single, valid JSON object.`
          }
        ],
        temperature: 0.7,
        system: "You are an expert golf analysis AI. You must always respond with valid JSON that can be parsed by JSON.parse(). Never include explanations or markdown - only pure JSON."
      }),
    });

    if (!anthropicResponse.ok) {
      const error = await anthropicResponse.text();
      console.error('Anthropic API error:', error);
      throw new Error(`Anthropic API error: ${error}`);
    }

    const analysisData = await anthropicResponse.json();
    
    if (!analysisData.content || !analysisData.content[0] || !analysisData.content[0].text) {
      console.error('Unexpected Anthropic response structure:', analysisData);
      throw new Error('Invalid response structure from Anthropic');
    }
    
    const rawAnalysis = analysisData.content[0].text;
    console.log('Received raw analysis, attempting to parse...');
    
    try {
      // Clean the response before parsing
      const cleanedResponse = cleanMarkdownFormatting(rawAnalysis);
      console.log('Cleaned response:', cleanedResponse.substring(0, 200) + '...');
      
      // Parse the cleaned response
      const parsedAnalysis = JSON.parse(cleanedResponse);
      console.log('Successfully parsed analysis as JSON');
      
      return new Response(
        JSON.stringify({ analysis: JSON.stringify(parsedAnalysis) }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      console.error('Error parsing analysis as JSON:', error);
      console.log('Raw response that failed to parse:', rawAnalysis.substring(0, 200) + '...');
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON response from analysis',
          details: error.message,
          rawResponse: rawAnalysis.substring(0, 200) + '...' // Log first 200 chars for debugging
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error('Error in analyze-golf function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'function_error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});