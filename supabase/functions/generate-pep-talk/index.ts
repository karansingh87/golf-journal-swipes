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
            content: `Review recent rounds and create a confidence-building pre-round reminder. Make it feel like getting advice from someone who really knows your game.

            Here are the recordings to analyze: ${JSON.stringify(recordings)}

            Return a single JSON object with this structure:
            {
              "sections": [
                {
                  "type": "game_strengths",
                  "content": [
                    "What's genuinely clicking right now in their game, supported by recent specific examples",
                    "Parts of their game they can lean on today with confidence",
                    "Current reliable patterns that are showing up consistently"
                  ]
                },
                {
                  "type": "key_thoughts",
                  "content": [
                    "The 2-3 most important swing thoughts/feels that are actually working",
                    "Clear cause-effect relationships from recent success",
                    "Simple reminders that connect to recent good shots"
                  ]
                },
                {
                  "type": "go_to_shots",
                  "content": [
                    "Their current reliable shots for specific situations",
                    "Shot shapes or types they can trust under pressure",
                    "Smart plays that have been working consistently"
                  ]
                },
                {
                  "type": "scoring_zones",
                  "content": [
                    "Specific distances or situations where they're particularly sharp",
                    "Areas of the course where they're creating opportunities",
                    "Patterns in where they're saving strokes"
                  ]
                },
                {
                  "type": "confidence_moments",
                  "content": [
                    "Recent specific success moments they can draw on",
                    "Pressure situations they handled well",
                    "Evidence their practice is paying off in real play"
                  ]
                }
              ]
            }

            Each insight must:
            - Reference specific recent successes
            - Avoid repeating information across categories
            - Focus on what's genuinely working now
            - Use natural, encouraging language
            - Connect to today's round

            Style guide:
            ✓ "Your high soft shots around the green are automatic right now"
            ✓ "That new grip is giving you all the confidence off the tee"
            ✗ "Implementation of modified technique has improved performance metrics"
            ✗ "You should try to..."

            Make every insight:
            - Specific but not technical
            - Confidence-building but honest
            - Based on actual recent success
            - Ready to use today
            - Natural and encouraging

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
      JSON.stringify({ error: 'Failed to generate pep talk', details: error.toString() }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})