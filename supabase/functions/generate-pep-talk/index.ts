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
    // Create a Supabase client with the service role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the user from the request authorization header
    const authHeader = req.headers.get('authorization')?.split(' ')[1];
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Get the user's ID from the session
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader);
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { recording_ids } = await req.json();
    
    if (!recording_ids || recording_ids.length === 0) {
      throw new Error("No recordings provided");
    }

    // Get the recordings data
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('*')
      .in('id', recording_ids);

    if (recordingsError) {
      throw recordingsError;
    }

    // Combine transcriptions and analyses
    const combinedContent = recordings.map(recording => ({
      transcription: recording.transcription,
      analysis: recording.analysis,
      date: recording.created_at,
    }));

    const prompt = `Analyze these golf transcripts:
${combinedContent.map((content, index) => 
  `Recording ${index + 1} (${new Date(content.date).toLocaleDateString()}):
  Transcription: ${content.transcription}
  Analysis: ${content.analysis}`
).join('\n\n')}

Analyze these golf transcripts. Return only what's working right now, with specific technical details and clear cause-effect relationships. Output should be brief but deep, like a knowledgeable friend reminding you of exactly why things are working.
Return as JSON with max 2-3 items per category:
{
  "hot_right_now": [
    {
      "aspect": string,  // specific part of game including technical detail
      "detail": string,  // exact what's working and why, max 12 words
      "proof": string    // specific recent result/outcome, max 10 words
    }
  ],
  "working_well": [
    {
      "type": string,    // "setup", "technique", "strategy", "feel"
      "what": string,    // specific technical detail that's working, max 12 words
      "when": string,    // concrete recent example with result, max 10 words
    }
  ],
  "go_to_shots": [
    {
      "situation": string,  // specific pressure or challenging scenario
      "your_move": string,  // exact technique/feel that's reliable, includes setup details
      "last_success": string  // recent example with outcome, max 10 words
    }
  ],
  "scoring_zones": [
    {
      "distance": string,  // specific yardage or situation
      "club": string,     // club choice with any relevant setup/technique notes
      "pattern": string   // why it's working, including technique details, max 12 words
    }
  ],
  "confidence_builders": [
    {
      "moment": string,  // specific breakthrough or success
      "why_special": string,  // technical detail of why it worked, max 10 words
      "repeatable_element": string  // exact keys to reproduce success, max 10 words
    }
  ]
}
Each item must:
- Include specific technical details (grip pressure, setup, motion)
- Show clear cause-effect relationships
- Reference actual shots/moments from recent rounds
- Connect practice changes to real results
- Explain why things are working, not just what's working
- Be quickly readable while maintaining depth
- Use precise golf language without being technical jargon
Important:
- No general swing tips
- No future suggestions
- No vague patterns
- Focus on specific, working details
- Include context of success (pressure, conditions, etc.)
- Link practice breakthroughs to real results`;

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
            content: prompt,
          },
        ],
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`Anthropic API error: ${error}`);
    }

    const data = await response.json();
    const pepTalkContent = JSON.parse(data.content[0].text);

    // Save the pep talk to the database with the user's ID
    const { data: savedPepTalk, error: saveError } = await supabaseClient
      .from('pep_talk')
      .insert({
        content: pepTalkContent,
        recording_ids: recording_ids,
        user_id: user.id
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving pep talk:', saveError);
      throw saveError;
    }

    return new Response(
      JSON.stringify(savedPepTalk),
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