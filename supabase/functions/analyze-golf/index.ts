import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    console.log('Starting analyze-golf function');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Fetching prompt configurations...');
    const { data: promptConfig, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt, insights_prompt')
      .single();

    if (promptError) {
      console.error('Error fetching prompts:', promptError);
      throw new Error(`Error fetching prompts: ${promptError.message}`);
    }

    console.log('Prompt configurations retrieved successfully');
    console.log('Analysis prompt:', promptConfig.prompt.substring(0, 50) + '...');
    console.log('Insights prompt:', promptConfig.insights_prompt.substring(0, 50) + '...');

    const { transcription } = await req.json();
    console.log('Received transcription length:', transcription.length);
    
    // Run both analyses in parallel
    console.log('Starting parallel OpenAI calls...');
    const [analysisResponse, insightsResponse] = await Promise.all([
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
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
          model: 'gpt-4',
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

    console.log('OpenAI calls completed, processing responses...');

    const [analysisData, insightsData] = await Promise.all([
      analysisResponse.json(),
      insightsResponse.json()
    ]);

    console.log('Analysis response status:', analysisResponse.status);
    console.log('Insights response status:', insightsResponse.status);

    if (!analysisData.choices?.[0]?.message?.content || !insightsData.choices?.[0]?.message?.content) {
      console.error('Invalid response format from OpenAI');
      console.error('Analysis data:', JSON.stringify(analysisData));
      console.error('Insights data:', JSON.stringify(insightsData));
      throw new Error('Invalid response format from OpenAI');
    }

    console.log('Successfully processed both responses');
    
    return new Response(JSON.stringify({ 
      analysis: analysisData.choices[0].message.content,
      insights: insightsData.choices[0].message.content
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-golf function:', error);
    console.error('Error stack:', error.stack);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});