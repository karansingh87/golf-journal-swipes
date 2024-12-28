import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { corsHeaders } from './openai.ts';
import { trendsSchema } from './schema.ts';
import { analyzeGolfTrends } from './openai.ts';

Deno.serve(async (req) => {
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user's recordings
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (recordingsError) {
      throw recordingsError;
    }

    if (!recordings.length) {
      throw new Error('No recordings found for analysis');
    }

    // Prepare data for OpenAI
    const recordingsData = recordings
      .map(r => ({
        analysis: r.analysis ? JSON.parse(r.analysis) : null,
        date: r.created_at
      }))
      .filter(r => r.analysis !== null);

    console.log('Prepared recordings data for analysis:', recordingsData.length, 'recordings');

    // Get analysis from OpenAI with structured output
    const trendsOutput = await analyzeGolfTrends(recordingsData, trendsSchema);

    console.log('Successfully generated trends analysis');

    // Update trends table
    const { error: updateError } = await supabaseClient
      .from('trends')
      .upsert({
        user_id,
        trends_output: trendsOutput,
        analyzed_recordings: recordings.map(r => r.id),
        last_analysis_at: new Date().toISOString()
      });

    if (updateError) {
      throw updateError;
    }

    console.log('Successfully saved trends for user:', user_id);

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error in generate-trends function:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});