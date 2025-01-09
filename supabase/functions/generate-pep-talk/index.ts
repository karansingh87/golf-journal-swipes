import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { recording_ids, userId } = await req.json()
    console.log('Processing recording IDs:', recording_ids)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch recordings data
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('transcription, analysis')
      .in('id', recording_ids)
      .order('created_at', { ascending: false })

    if (recordingsError) {
      console.error('Error fetching recordings:', recordingsError)
      throw new Error('Failed to fetch recordings')
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
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
      }),
    })

    if (!response.ok) {
      console.error('Error from Claude API:', await response.text())
      throw new Error('Failed to generate pep talk')
    }

    const aiResponse = await response.json()
    console.log('Claude API response:', aiResponse)

    const content = JSON.parse(aiResponse.content[0].text)

    // Store the pep talk in the database
    const { data: pepTalk, error: pepTalkError } = await supabaseClient
      .from('pep_talk')
      .insert([
        {
          user_id: userId,
          recording_ids,
          content: JSON.stringify(content)
        }
      ])
      .select()
      .single()

    if (pepTalkError) {
      console.error('Error storing pep talk:', pepTalkError)
      throw new Error('Failed to store pep talk')
    }

    // Return the generated pep talk
    return new Response(
      JSON.stringify({ content, id: pepTalk.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-pep-talk function:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate pep talk' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})