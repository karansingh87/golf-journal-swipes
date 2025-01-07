import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { recordings } = await req.json()
    console.log('Received recordings:', recordings)

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
            content: `Analyze these golf round transcripts and create a structured coach summary. Here are the recordings to analyze: ${JSON.stringify(recordings)}

            Return a JSON object with this structure:
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
            Return only the populated JSON object without any additional text or explanation.`,
          },
        ],
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Anthropic API error:', error)
      throw new Error(`Anthropic API error: ${error}`)
    }

    const data = await response.json()
    const analysis = data.content[0].text

    // Parse and validate the response
    try {
      const parsedAnalysis = JSON.parse(analysis)
      console.log('Successfully parsed analysis:', parsedAnalysis)
      
      return new Response(JSON.stringify({ analysis: parsedAnalysis }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error parsing analysis:', error)
      throw new Error('Failed to parse AI response as JSON')
    }
  } catch (error) {
    console.error('Error in generate-coaching-notes function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})