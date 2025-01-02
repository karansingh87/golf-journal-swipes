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
    
    if (!user_id) {
      throw new Error('No user_id provided')
    }

    console.log('Generating trends for user:', user_id)

    // Ensure proper URL formatting by removing any trailing colons
    const supabaseUrl = (Deno.env.get('SUPABASE_URL') ?? '').replace(/:\/?$/, '')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the trends prompt and model configuration
    const { data: promptData, error: promptError } = await supabaseClient
      .from('prompt_config')
      .select('trends_prompt, model_provider, model_name')
      .single()

    if (promptError) {
      throw promptError
    }

    if (!promptData.trends_prompt) {
      throw new Error('No trends prompt configured')
    }

    // Get user's recordings - limit to last 10 and only fetch necessary fields
    const { data: recordings, error: recordingsError } = await supabaseClient
      .from('recordings')
      .select('analysis, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (recordingsError) {
      throw recordingsError
    }

    if (!recordings.length) {
      throw new Error('No recordings found for analysis')
    }

    // Prepare data for AI - only send essential information
    const recordingsData = recordings.map(r => {
      try {
        return {
          analysis: r.analysis ? JSON.parse(r.analysis) : null,
          date: r.created_at
        }
      } catch (error) {
        console.error('Error parsing recording analysis:', error)
        return null
      }
    }).filter(r => r !== null && r.analysis !== null)

    if (recordingsData.length === 0) {
      throw new Error('No valid recordings found for analysis')
    }

    console.log('Sending request to AI with data length:', JSON.stringify(recordingsData).length)

    let aiResponse;
    if (promptData.model_provider === 'anthropic') {
      // Call Anthropic API
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: promptData.model_name,
          messages: [
            {
              role: 'user',
              content: `${promptData.trends_prompt}\n\nPlease provide your response as a valid JSON object. Do not include markdown code blocks or any other formatting. Here is the data to analyze:\n\n${JSON.stringify(recordingsData)}`,
            },
          ],
          max_tokens: 4096,
        }),
      })

      if (!anthropicResponse.ok) {
        const error = await anthropicResponse.text()
        console.error('Anthropic API error:', error)
        throw new Error(`Anthropic API error: ${error}`)
      }

      const anthropicData = await anthropicResponse.json()
      aiResponse = anthropicData.content[0].text
    } else {
      // Call OpenAI API
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: promptData.model_name,
          messages: [
            {
              role: 'system',
              content: 'You must respond with a valid JSON object. Do not include markdown code blocks or any other formatting.',
            },
            {
              role: 'user',
              content: `${promptData.trends_prompt}\n\nAnalyze this data:\n${JSON.stringify(recordingsData)}`,
            },
          ],
        }),
      })

      if (!openAIResponse.ok) {
        const error = await openAIResponse.text()
        console.error('OpenAI API error:', error)
        throw new Error(`OpenAI API error: ${error}`)
      }

      const openAIData = await openAIResponse.json()
      aiResponse = openAIData.choices[0].message.content
    }

    // Clean up the AI response and ensure it's valid JSON
    let cleanResponse = aiResponse
    try {
      // First try to parse as is
      JSON.parse(cleanResponse)
    } catch (error) {
      // If parsing fails, try to clean up markdown and try again
      console.log('Initial JSON parsing failed, attempting to clean response')
      cleanResponse = aiResponse.replace(/```json\n|\n```/g, '').trim()
      
      try {
        JSON.parse(cleanResponse)
      } catch (error) {
        console.error('Failed to parse AI response as JSON:', cleanResponse)
        throw new Error('AI response is not valid JSON even after cleanup')
      }
    }

    // Update trends table
    const { error: updateError } = await supabaseClient
      .from('trends')
      .upsert({
        user_id,
        trends_output: cleanResponse,
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