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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No signature provided')
    }

    const body = await req.text()

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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Processing webhook event:', event.type)

    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;
        
        console.log('Processing new subscription creation for customer:', customerId);
        
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profileError || !profiles) {
          console.error('Error finding user:', profileError);
          throw new Error('User not found');
        }

        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({
            subscription_tier: 'pro',
            has_pro_access: true,
            subscription_status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('id', profiles.id);

        if (updateError) {
          console.error('Error updating user profile:', updateError);
          throw new Error('Failed to update user profile');
        }

        console.log('Successfully processed subscription creation');
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer;
        const isLifetime = session.mode === 'payment';
        
        console.log('Processing checkout completion for customer:', customerId);

        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError || !profiles) {
          console.error('Error finding user:', profileError)
          throw new Error('User not found')
        }

        // Set subscription tier and pro access
        const updateData = {
          subscription_tier: isLifetime ? 'lifetime' : 'pro',
          has_pro_access: true,
          subscription_status: 'active',
          stripe_customer_id: customerId,
          current_period_end: isLifetime ? null : 
            session.subscription ? 
              new Date(session.subscription.current_period_end * 1000).toISOString() : 
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now as fallback
        }

        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update(updateData)
          .eq('id', profiles.id)

        if (updateError) {
          console.error('Error updating user:', updateError)
          throw new Error('Failed to update user')
        }

        console.log(`Successfully updated user to ${updateData.subscription_tier} tier with pro access`)
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer as string
        
        console.log('Processing subscription deletion for customer:', customerId)
        
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id, subscription_tier')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError || !profiles) {
          console.error('Error finding user:', profileError)
          throw new Error('User not found')
        }

        // Only update if not lifetime
        if (profiles.subscription_tier !== 'lifetime') {
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_tier: 'free',
              has_pro_access: false,
              subscription_status: 'canceled',
              current_period_end: null,
            })
            .eq('id', profiles.id)

          if (updateError) {
            console.error('Error updating user:', updateError)
            throw new Error('Failed to update user')
          }

          console.log('Successfully downgraded user to free tier')
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const customerId = subscription.customer as string
        
        console.log('Processing subscription update for customer:', customerId)
        
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id, subscription_tier')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError || !profiles) {
          console.error('Error finding user:', profileError)
          throw new Error('User not found')
        }

        // Only update if not lifetime
        if (profiles.subscription_tier !== 'lifetime') {
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_tier: 'pro',
              has_pro_access: true,
              subscription_status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('id', profiles.id)

          if (updateError) {
            console.error('Error updating user:', updateError)
            throw new Error('Failed to update user')
          }

          console.log('Successfully updated subscription details')
        }
        break;
      }

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