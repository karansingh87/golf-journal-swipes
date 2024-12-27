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
    console.log('Generating trends for user:', user_id)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

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

    if (!recordings || recordings.length < 3) {
      console.log('Not enough recordings found')
      return new Response(
        JSON.stringify({ error: 'Not enough recordings' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the prompt from prompt_config
    const { data: promptData, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt')
      .single()

    if (promptError) {
      console.error('Error fetching prompt:', promptError)
      throw promptError
    }

    // Prepare analyses for the AI
    const analyses = recordings.map(r => r.analysis).filter(Boolean)
    console.log('Analyses prepared:', analyses.length)

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
            content: promptData.prompt,
          },
          {
            role: 'user',
            content: analyses.join('\n\n---\n\n'),
          },
        ],
      }),
    })

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error}`)
    }

    const analysisData = await openAIResponse.json()
    const trends = JSON.parse(analysisData.choices[0].message.content)
    console.log('Trends generated successfully')

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

    console.log('Trends saved successfully')

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