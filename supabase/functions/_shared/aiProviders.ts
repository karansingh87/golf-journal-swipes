interface AIResponse {
  content: string;
}

export async function callAnthropic(prompt: string, data: any): Promise<AIResponse> {
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
          content: `${prompt}\n\nPlease provide your response as a valid JSON object. Do not include markdown code blocks or any other formatting. Here is the data to analyze:\n\n${JSON.stringify(data)}`,
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

  const data_1 = await response.json();
  return { content: data_1.content[0].text };
}

export async function callOpenAI(prompt: string, data: any): Promise<AIResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You must respond with a valid JSON object. Do not include markdown code blocks or any other formatting.',
        },
        {
          role: 'user',
          content: `${prompt}\n\nAnalyze this data:\n${JSON.stringify(data)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data_1 = await response.json();
  return { content: data_1.choices[0].message.content };
}