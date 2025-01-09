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
            content: `Review recent rounds and create a quick pre-round boost. Focus on what's clicking right now and key reminders that will help them play with confidence.

            Here are the recordings to analyze: ${JSON.stringify(recordings)}

            Return as JSON:
            {
              "feeling_good": [
                {
                  "aspect": string,  // part of game that's clicking
                  "why": string,     // specific detail of what's working
                  "proof": string    // recent success example
                }
              ],
              "key_reminders": [
                {
                  "thought": string,  // specific swing thought or strategy
                  "why_it_works": string  // why this is working for you
                }
              ],
              "recent_wins": [
                {
                  "moment": string,  // specific success
                  "take_forward": string  // what to remember about this
                }
              ]
            }

            Make it feel like a friend saying: "Hey, remember your driving is really clicking with that new grip thought" or "That par save on 18 yesterday was clutch - you're putting great when you trust your line."

            Keep it specific to their game but make it encouraging and confidence-building. Max 2-3 items per category. No technical overload, just clear reminders of what's working.

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