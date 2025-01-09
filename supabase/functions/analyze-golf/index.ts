import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { cleanAndValidateJSON } from '../_shared/responseUtils.ts'

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

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the analysis prompt - there should only be one row in prompt_config
    const { data: promptData, error: promptError } = await supabase
      .from('prompt_config')
      .select('prompt')
      .single()

    if (promptError) {
      console.error('Error fetching prompt:', promptError)
      throw promptError
    }

    if (!promptData?.prompt) {
      console.error('No prompt configuration found')
      throw new Error('No prompt configuration found')
    }

    console.log('Using prompt configuration:', { promptLength: promptData.prompt.length })

    // Get analysis from Anthropic using Claude
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${promptData.prompt}\n\nHere is the transcription to analyze:\n${transcription}`
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
    const rawAnalysis = analysisData.content[0].text
    
    // Clean and validate the JSON response
    console.log('Raw analysis response:', rawAnalysis)
    const cleanedAnalysis = cleanAndValidateJSON(rawAnalysis)
    console.log('Cleaned analysis:', cleanedAnalysis)

    return new Response(
      JSON.stringify({ analysis: cleanedAnalysis }),
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