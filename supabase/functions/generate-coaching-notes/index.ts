import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recordingIds, userId } = await req.json();
    
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Fetch recordings data
    const { data: recordings, error: recordingsError } = await supabase
      .from('recordings')
      .select('transcription, analysis')
      .in('id', recordingIds)
      .eq('user_id', userId);

    if (recordingsError) throw recordingsError;
    
    // Prepare the context for Claude
    const roundContext = recordings.map((rec, index) => {
      return `Round ${index + 1}:\nTranscription: ${rec.transcription}\nAnalysis: ${rec.analysis}\n\n`;
    }).join('\n');

    const prompt = `You are an expert golf coach analyzing round transcripts. Analyze these golf round transcripts and create a structured coach summary which is returned as a JSON object with the following structure:
{
  "technical_observations": [
    // List of key patterns in setup, swing mechanics, and ball flight
  ],
  "key_situations": [
    // List of specific holes or shots needing discussion, including hole number and details
  ],
  "equipment_notes": [
    // List of any equipment or setup adjustments and their effects
  ],
  "progress_notes": [
    // List of observations about improvement or challenges on previous lesson focuses
  ],
  "coaching_questions": [
    // List of questions extracted from the round context
  ]
}
Return only the populated JSON object without any additional text or explanation.

Here are the rounds to analyze:

${roundContext}`;

    // Call Claude API with the correct format
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        system: 'You are an expert golf coach analyzing round transcripts.',
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to generate coaching notes');
    }

    const coachingNotes = result.content[0].text;
    
    // Store the coaching notes
    const { data: savedNotes, error: saveError } = await supabase
      .from('coaching_notes')
      .insert({
        user_id: userId,
        recording_ids: recordingIds,
        notes: coachingNotes,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(JSON.stringify({ success: true, notes: savedNotes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-coaching-notes function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});