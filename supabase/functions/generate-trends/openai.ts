export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export async function analyzeGolfTrends(recordingsData: any[], schema: any) {
  console.log('Sending request to OpenAI with data length:', JSON.stringify(recordingsData).length);
  
  const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
          content: Deno.env.get('TRENDS_PROMPT') || 'Analyze the golf session recordings and provide structured insights.',
        },
        {
          role: 'user',
          content: JSON.stringify(recordingsData),
        },
      ],
      response_format: { 
        type: "json_schema",
        schema: schema
      }
    }),
  });

  if (!openAIResponse.ok) {
    const error = await openAIResponse.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${error}`);
  }

  const analysisData = await openAIResponse.json();
  return analysisData.choices[0].message.content;
}