import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

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
    const { user_id } = await req.json()
    console.log('Starting trends generation for user:', user_id)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the trends prompt first
    const { data: promptConfig, error: promptError } = await supabase
      .from('prompt_config')
      .select('trends_prompt')
      .single()

    if (promptError || !promptConfig?.trends_prompt) {
      console.error('Error fetching trends prompt:', promptError)
      throw new Error('Failed to fetch trends prompt configuration')
    }

    // Get the last 3 recordings with analysis
    const { data: recordings, error: recordingsError } = await supabase
      .from('recordings')
      .select('id, analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(3)

    if (recordingsError) {
      console.error('Error fetching recordings:', recordingsError)
      throw recordingsError
    }

    console.log(`Found ${recordings?.length || 0} recordings`)

    if (!recordings || recordings.length < 3) {
      console.log('Not enough recordings found')
      return new Response(
        JSON.stringify({ error: 'Not enough recordings. Minimum 3 recordings required.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare analyses for the AI
    const analyses = recordings
      .map(r => r.analysis)
      .filter(Boolean)
      .map((analysis, index) => `Recording ${index + 1}:\n${analysis}`)

    console.log('Analyses prepared:', analyses.length)

    // Add explicit JSON structure to the system prompt
    const systemPrompt = `${promptConfig.trends_prompt}\n\nYou must return a JSON object with this exact structure:
{
  "patterns": [
    {
      "type": "hidden_strength" | "mental_signature" | "game_changing" | "strategic_instinct" | "growth_indicator",
      "title": "string",
      "insight": "string",
      "pattern_evidence": "string",
      "strength_rating": number,
      "observation_window": "string",
      "deeper_meaning": "string"
    }
  ],
  "analysis_metadata": {
    "sessions_reviewed": number,
    "time_period": "string",
    "pattern_confidence": number
  }
}`

    console.log('Sending request to OpenAI...')

    // Get analysis from OpenAI
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: analyses.join('\n\n---\n\n'),
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error}`)
    }

    const analysisData = await openAIResponse.json()
    console.log('Successfully received OpenAI response')

    let trends
    try {
      console.log('Raw OpenAI response:', analysisData.choices[0].message.content)
      trends = JSON.parse(analysisData.choices[0].message.content)
      console.log('Successfully parsed trends data:', trends)
    } catch (error) {
      console.error('Error parsing OpenAI response:', error)
      console.error('Raw response:', analysisData.choices[0].message.content)
      throw new Error('Invalid response format from OpenAI')
    }

    // Validate the trends object has the required properties and types
    if (!trends?.patterns || !Array.isArray(trends.patterns) || !trends?.analysis_metadata) {
      console.error('Invalid trends format:', trends)
      throw new Error('Invalid trends format received from OpenAI')
    }

    // Additional validation for required fields and types
    for (const pattern of trends.patterns) {
      if (!pattern.type || !pattern.title || !pattern.insight || 
          !pattern.pattern_evidence || !pattern.strength_rating || 
          !pattern.observation_window || !pattern.deeper_meaning) {
        console.error('Invalid pattern format:', pattern)
        throw new Error('Invalid pattern format in OpenAI response')
      }
    }

    // Save the trends
    const { error: trendsError } = await supabase
      .from('trends')
      .insert({
        user_id,
        analyzed_recordings: recordings.map(r => r.id),
        patterns: trends.patterns,
        analysis_metadata: trends.analysis_metadata,
      })

    if (trendsError) {
      console.error('Error saving trends:', trendsError)
      throw trendsError
    }

    console.log('Successfully saved trends to database')

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-trends function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})