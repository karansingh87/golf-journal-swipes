import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { callAnthropic, callOpenAI } from '../_shared/aiProviders.ts'
import { cleanAndValidateJSON, prepareRecordingsData } from '../_shared/responseUtils.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { user_id } = await req.json()
    
    if (!user_id) {
      throw new Error('No user_id provided')
    }

    console.log('Generating trends for user:', user_id)

    const supabaseUrl = (Deno.env.get('SUPABASE_URL') ?? '').replace(/:\/?$/, '')
    const supabaseClient = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the trends prompt and model configuration
    const { data: promptData, error: promptError } = await supabaseClient
      .from('prompt_configurations')
      .select('content, model_provider, model_name')
      .eq('type', 'trends')
      .eq('is_latest', true)
      .single()

    if (promptError) throw promptError
    if (!promptData?.content) throw new Error('No trends prompt configured')

    // Get user's recordings
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (recordingsError) throw recordingsError
    if (!recordings.length) throw new Error('No recordings found for analysis')

    const recordingsData = prepareRecordingsData(recordings)
    console.log('Sending request to AI with data length:', JSON.stringify(recordingsData).length)

    // Get AI response using the configured provider
    const aiResponse = await callAnthropic(promptData.content, recordingsData)
    const cleanResponse = cleanAndValidateJSON(aiResponse.content)

    // Update trends table
    const { error: updateError } = await supabaseClient
      .from('trends')
      .upsert({
        user_id,
        trends_output: cleanResponse,
        analyzed_recordings: recordings.map(r => r.id),
        last_analysis_at: new Date().toISOString()
      })

    if (updateError) throw updateError

    console.log('Successfully generated trends for user:', user_id)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-trends function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})