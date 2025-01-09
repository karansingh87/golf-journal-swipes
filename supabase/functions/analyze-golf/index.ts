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
    const { transcription } = await req.json()
    console.log('Analyzing transcription:', { length: transcription.length })

    if (!transcription) {
      throw new Error('No transcription provided')
    }

    // Get the Supabase URL and ensure it's properly formatted
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL environment variable is not set')
    }

    // Create Supabase client
    const supabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the analysis prompt
    const { data: promptData, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt')
      .single()

    if (promptError) {
      console.error('Error fetching prompt:', promptError)
      throw promptError
    }

    if (!promptData) {
      console.error('No prompt configuration found')
      throw new Error('No prompt configuration found')
    }

    const analysisPrompt = promptData.prompt

    // Get analysis from Anthropic using Claude
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${analysisPrompt}\n\nHere is the transcription to analyze:\n${transcription}`
          }
        ]
      }),
    })

    if (!anthropicResponse.ok) {
      const error = await anthropicResponse.text()
      console.error('Anthropic API error:', error)
      throw new Error(`Anthropic API error: ${error}`)
    }

    const analysisData = await anthropicResponse.json()
    const analysis = analysisData.content[0].text

    console.log('Analysis completed successfully')

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-golf function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})