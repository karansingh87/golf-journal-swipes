import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
    // Get the user ID from the request
    const { user_id } = await req.json()
    
    if (!user_id) {
      throw new Error('No user_id provided')
    }

    console.log('Generating trends for user:', user_id)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the trends prompt
    const { data: promptData, error: promptError } = await supabaseClient
      .from('prompt_config')
      .select('trends_prompt')
      .single()

    if (promptError) {
      throw promptError
    }

    if (!promptData.trends_prompt) {
      throw new Error('No trends prompt configured')
    }

    // Get user's recordings
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('transcription, analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (recordingsError) {
      throw recordingsError
    }

    if (!recordings.length) {
      throw new Error('No recordings found for analysis')
    }

    // Prepare data for OpenAI
    const recordingsData = recordings.map(r => ({
      transcription: r.transcription,
      analysis: r.analysis,
      date: r.created_at
    }))

    // Get analysis from OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: promptData.trends_prompt,
          },
          {
            role: 'user',
            content: JSON.stringify(recordingsData),
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
    const trendsOutput = analysisData.choices[0].message.content

    // Update trends table
    const { error: updateError } = await supabaseClient
      .from('trends')
      .upsert({
        user_id,
        trends_output: trendsOutput,
        analyzed_recordings: recordings.map(r => r.id),
        last_analysis_at: new Date().toISOString()
      })

    if (updateError) {
      throw updateError
    }

    console.log('Successfully generated trends for user:', user_id)

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error in generate-trends function:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})