import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { recordings } = await req.json();
    
    if (!recordings || recordings.length === 0) {
      throw new Error("No recordings provided");
    }

    // Combine transcriptions and analyses
    const combinedContent = recordings.map((recording: any) => ({
      transcription: recording.transcription,
      analysis: recording.analysis,
      date: recording.created_at,
    }));

    const prompt = `Based on these golf practice recordings:
${combinedContent.map((content: any, index: number) => 
  `Recording ${index + 1} (${new Date(content.date).toLocaleDateString()}):
  Transcription: ${content.transcription}
  Analysis: ${content.analysis}`
).join('\n\n')}

Generate an encouraging and motivational pep talk that:
1. Highlights specific improvements and progress noticed across these sessions
2. Acknowledges challenges but frames them positively
3. Provides specific, actionable encouragement for future practice
4. Keeps a warm, supportive tone throughout

Keep the response concise but impactful, around 200 words.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an encouraging golf coach who specializes in providing motivational pep talks based on practice session analyses.'
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const pepTalk = data.choices[0].message.content;

    // Save the pep talk to the database
    const { data: savedPepTalk, error: saveError } = await supabaseClient
      .from('pep_talk')
      .insert({
        content: { text: pepTalk },
        recording_ids: recordings.map((r: any) => r.id)
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({ pepTalk: savedPepTalk }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});