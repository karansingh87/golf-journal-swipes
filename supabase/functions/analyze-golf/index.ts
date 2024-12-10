import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcription } = await req.json();
    
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
            content: `ChatGPT, I'm going to the golf course and I want you to help me document my session in detail. As I dictate notes throughout my session, please record them in the following format:

1. Record each note chronologically, as a running journal of my session.
2. At the end of the session, summarize my overall performance, feelings, adjustments made, and effectiveness of these adjustments.
3. Compile my notes into a table format for easy reference and trend analysis. This should include the date, club used, specific issue faced, adjustments made, effectiveness rating, thoughts/feelings, overall performance, and final takeaways.`
          },
          {
            role: 'user',
            content: transcription
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('GPT Analysis completed successfully');
    
    return new Response(JSON.stringify({ 
      analysis: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-golf function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});