import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request data
    const { user_id } = await req.json();
    console.log('Generating pep talk for user:', user_id);

    // Get the last 3 recordings with analysis
    const { data: recordings, error: recordingsError } = await supabase
      .from('recordings')
      .select('id, analysis, created_at')
      .eq('user_id', user_id)
      .not('analysis', 'is', null)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recordingsError) {
      console.error('Error fetching recordings:', recordingsError);
      throw new Error('Failed to fetch recordings');
    }

    if (!recordings.length) {
      return new Response(
        JSON.stringify({ error: 'No analyzed recordings found' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the pep talk prompt from prompt_config
    const { data: promptConfig, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt')
      .single();

    if (promptError) {
      console.error('Error fetching prompt:', promptError);
      throw new Error('Failed to fetch prompt configuration');
    }

    // Prepare the analyses data
    const analysesData = recordings.map(r => {
      try {
        return JSON.parse(r.analysis);
      } catch (error) {
        console.error('Error parsing recording analysis:', error);
        return null;
      }
    }).filter(Boolean);

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        messages: [
          {
            role: 'user',
            content: `${promptConfig.prompt}\n\n${JSON.stringify(analysesData)}`,
          },
        ],
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      throw new Error(`Claude API error: ${error}`);
    }

    const aiResponse = await response.json();
    const content = JSON.parse(aiResponse.content[0].text);

    // Save the pep talk to the database
    const { data: pepTalk, error: insertError } = await supabase
      .from('pep_talk')
      .insert({
        user_id,
        content,
        recording_ids: recordings.map(r => r.id),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error saving pep talk:', insertError);
      throw new Error('Failed to save pep talk');
    }

    return new Response(
      JSON.stringify(pepTalk),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-pep-talk function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});