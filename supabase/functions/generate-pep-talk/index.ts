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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''  // Use service role key instead of anon key
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
    const pepTalk = data.content[0].text;

    // Save the pep talk to the database with the user's ID
    const { data: savedPepTalk, error: saveError } = await supabaseClient
      .from('pep_talk')
      .insert({
        content: { text: pepTalk },
        recording_ids: recordings.map((r: any) => r.id),
        user_id: user.id  // Set the user_id to the authenticated user's ID
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving pep talk:', saveError);
      throw saveError;
    }

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