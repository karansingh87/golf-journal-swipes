import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import Stripe from 'https://esm.sh/stripe@13.6.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Initialize Supabase Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify admin status
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Invalid token')
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profileError || !profile?.is_admin) {
      throw new Error('Unauthorized - Admin access required')
    }

    console.log('Starting subscription sync process...')

    // Get all profiles with stripe_customer_id
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .not('stripe_customer_id', 'is', null)

    if (profilesError) {
      throw new Error(`Error fetching profiles: ${profilesError.message}`)
    }

    console.log(`Found ${profiles.length} profiles with Stripe customer IDs`)

    const updates = []

    // Process each profile
    for (const profile of profiles) {
      try {
        console.log(`Processing customer ${profile.stripe_customer_id}`)

        // Get customer's subscriptions from Stripe
        const subscriptions = await stripe.subscriptions.list({
          customer: profile.stripe_customer_id,
          limit: 1,
          status: 'active',
        })

        const activeSubscription = subscriptions.data[0]

        // Prepare profile update
        const updateData = {
          has_pro_access: false,
          subscription_tier: 'free',
          subscription_status: null,
          current_period_end: null,
        }

        if (activeSubscription) {
          console.log(`Found active subscription for customer ${profile.stripe_customer_id}`)
          updateData.has_pro_access = true
          updateData.subscription_tier = 'pro'
          updateData.subscription_status = activeSubscription.status
          updateData.current_period_end = new Date(activeSubscription.current_period_end * 1000).toISOString()
        }

        // Update profile
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update(updateData)
          .eq('id', profile.id)

        if (updateError) {
          throw new Error(`Error updating profile ${profile.id}: ${updateError.message}`)
        }

        updates.push({
          id: profile.id,
          status: 'success',
          changes: updateData,
        })

      } catch (error) {
        console.error(`Error processing profile ${profile.id}:`, error)
        updates.push({
          id: profile.id,
          status: 'error',
          error: error.message,
        })
      }
    }

    console.log('Subscription sync completed')

    return new Response(
      JSON.stringify({
        message: 'Subscription sync completed',
        updates,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in sync-stripe-subscriptions:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})