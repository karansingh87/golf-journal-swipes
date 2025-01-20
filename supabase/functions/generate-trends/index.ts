import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();
    
    if (!user_id) {
      throw new Error('No user_id provided');
    }

    console.log('Generating trends for user:', user_id);

    // Initialize Supabase client
    const supabaseUrl = (Deno.env.get('SUPABASE_URL') ?? '').replace(/:\/?$/, '');
    const supabaseClient = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the trends prompt and model configuration
    const { data: promptData, error: promptError } = await supabaseClient
      .from('prompt_config')
      .select('trends_prompt, model_provider, model_name')
      .single();

    if (promptError) {
      console.error('Error fetching prompt:', promptError);
      throw promptError;
    }

    if (!promptData.trends_prompt) {
      console.error('No trends prompt configured');
      throw new Error('No trends prompt configured');
    }

    // Get user's recordings - Updated to fetch 5 most recent recordings
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (recordingsError) {
      console.error('Error fetching recordings:', recordingsError);
      throw recordingsError;
    }

    if (!recordings.length) {
      console.error('No recordings found for analysis');
      throw new Error('No recordings found for analysis');
    }

    console.log('Found recordings:', recordings.length);

    // Prepare data for analysis
    const recordingsData = recordings.map(recording => ({
      analysis: recording.analysis,
      date: recording.created_at
    }));

    // Get AI response using the configured provider
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: promptData.model_name,
        messages: [
          {
            role: 'user',
            content: `${promptData.trends_prompt}\n\nPlease provide your response as a valid JSON object. Do not include markdown code blocks or any other formatting. Here is the data to analyze:\n\n${JSON.stringify(recordingsData)}`,
          },
        ],
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      throw new Error(`AI API error: ${error}`);
    }

    const aiData = await response.json();
    console.log('Received AI response');

    // Clean and parse the AI response
    const cleanResponse = aiData.content[0].text
      .replace(/```json\n?|\n?```/g, '')  // Remove markdown code blocks
      .trim();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanResponse);
      console.log('Successfully parsed AI response');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.error('Raw response:', cleanResponse.substring(0, 200) + '...');
      throw new Error('Invalid JSON response from AI');
    }

    // Update trends table
    const { error: updateError } = await supabaseClient
      .from('trends')
      .upsert({
        user_id,
        trends_output: cleanResponse,
        analyzed_recordings: recordings.map(r => r.id),
        last_analysis_at: new Date().toISOString()
      });

    if (updateError) {
      console.error('Error updating trends:', updateError);
      throw updateError;
    }

    console.log('Successfully generated trends for user:', user_id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-trends function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})