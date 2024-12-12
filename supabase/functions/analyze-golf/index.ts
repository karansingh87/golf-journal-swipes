import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: promptConfig, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt, insights_prompt')
      .single();

    if (promptError) {
      throw new Error(`Error fetching prompts: ${promptError.message}`);
    }

    const { transcription } = await req.json();
    
    // Run both analyses in parallel
    const [analysisResponse, insightsResponse] = await Promise.all([
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `${promptConfig.prompt}\n\nPlease format your response using markdown with the following structure:
# Overall Analysis

[Brief overview of the session]

## Technique Analysis
- Point 1
- Point 2

## Areas for Improvement
1. First area
2. Second area

## Recommendations
### Short-term Goals
- Goal 1
- Goal 2

### Long-term Development
- Development point 1
- Development point 2

## Next Steps
[Actionable next steps]`
            },
            {
              role: 'user',
              content: transcription
            }
          ],
        }),
      }),
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: promptConfig.insights_prompt
            },
            {
              role: 'user',
              content: transcription
            }
          ],
        }),
      })
    ]);

    const [analysisData, insightsData] = await Promise.all([
      analysisResponse.json(),
      insightsResponse.json()
    ]);

    console.log('GPT Analysis and Insights completed successfully');
    
    return new Response(JSON.stringify({ 
      analysis: analysisData.choices[0].message.content,
      insights: insightsData.choices[0].message.content
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