import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import Stripe from 'https://esm.sh/stripe@13.6.0'

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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Get the signature from the header
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No signature provided')
    }

    // Get the raw body
    const body = await req.text()

    // Verify the webhook signature using the async method
    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
      )
      console.log('Webhook signature verified successfully')
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`, err.message)
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Processing webhook event:', event.type)

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object
        const customerId = subscription.customer as string
        
        console.log('Processing subscription event for customer:', customerId)
        console.log('Subscription status:', subscription.status)
        
        // Get the user with this stripe_customer_id
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError || !profiles) {
          console.error('Error finding user:', profileError)
          throw new Error('User not found')
        }

        console.log('Found user profile:', profiles.id)

        // Map Stripe subscription status to our allowed values
        const dbStatus = ['active', 'trialing'].includes(subscription.status) ? 'active' : 'inactive'
        const subscriptionTier = dbStatus === 'active' ? 'pro' : 'starter'

        console.log('Mapping status:', subscription.status, 'to:', dbStatus)
        console.log('Setting subscription tier to:', subscriptionTier)

        // Update the user's subscription status
        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({
            subscription_status: dbStatus,
            subscription_tier: subscriptionTier,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('id', profiles.id)

        if (updateError) {
          console.error('Error updating user:', updateError)
          throw new Error('Failed to update user')
        }

        console.log('Successfully updated user subscription status')
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        const deletedCustomerId = deletedSubscription.customer as string

        console.log('Processing subscription deletion for customer:', deletedCustomerId)

        // Get the user with this stripe_customer_id
        const { data: deletedProfile, error: deletedProfileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', deletedCustomerId)
          .single()

        if (deletedProfileError || !deletedProfile) {
          console.error('Error finding user:', deletedProfileError)
          throw new Error('User not found')
        }

        console.log('Found user profile for deletion:', deletedProfile.id)

        // Reset the user's subscription status
        const { error: resetError } = await supabaseClient
          .from('profiles')
          .update({
            subscription_status: 'inactive',
            subscription_tier: 'starter',
            current_period_end: null,
          })
          .eq('id', deletedProfile.id)

        if (resetError) {
          console.error('Error resetting user:', resetError)
          throw new Error('Failed to reset user')
        }

        console.log('Successfully reset user subscription status')
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})