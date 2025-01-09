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
    console.log('Received recordings for pep talk:', recordings)

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
            content: `Analyze these golf round transcripts and create an encouraging pep talk summary. Here are the recordings to analyze: ${JSON.stringify(recordings)}

            Return a JSON object with this structure:
            {
              "hot_right_now": [
                // List of 2-3 aspects of their game that are working well
              ],
              "working_well": [
                // List of specific improvements or progress noted
              ],
              "go_to_shots": [
                // List of reliable shots or clubs they can count on
              ],
              "scoring_zones": [
                // Areas of the course where they're performing well
              ],
              "confidence_builders": [
                // Specific positive patterns or achievements to build on
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
      console.log('Successfully parsed pep talk:', parsedAnalysis)
      
      return new Response(JSON.stringify({ analysis: parsedAnalysis }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error parsing pep talk:', error)
      throw new Error('Failed to parse AI response as JSON')
    }
  } catch (error) {
    console.error('Error in generate-pep-talk function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})