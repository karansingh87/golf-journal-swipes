import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  try {
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    const email = user?.email;

    if (!email) {
      throw new Error('No email found');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customer_id;
    if (customers.data.length > 0) {
      customer_id = customers.data[0].id;
      console.log('Found existing customer:', customer_id);

      // Check for active subscriptions
      const activeSubscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        status: 'active',
        limit: 1
      });

      if (activeSubscriptions.data.length > 0) {
        throw new Error("Customer already has an active subscription");
      }
    } else {
      const customer = await stripe.customers.create({
        email: email,
      });
      customer_id = customer.id;
      console.log('Created new customer:', customer_id);
    }

    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ stripe_customer_id: customer_id })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating profile with customer ID:', updateError);
      throw new Error('Failed to update profile with customer ID');
    }

    console.log('Creating checkout session...');
    const sessionConfig: any = {
      customer: customer_id,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            recurring: {
              interval: 'month',
            },
            product_data: {
              name: 'Pro Monthly',
              description: 'Monthly subscription to Pro features',
            },
            unit_amount: 1499, // $14.99 per month
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            recurring: {
              interval: 'year',
            },
            product_data: {
              name: 'Pro Annual',
              description: 'Annual subscription to Pro features (2 months free)',
            },
            unit_amount: 14990, // $149.90 per year
          },
          quantity: 1,
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      payment_method_collection: 'if_required',
      success_url: `${req.headers.get('origin')}/settings?success=true`,
      cancel_url: `${req.headers.get('origin')}/settings?canceled=true`,
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Checkout session created:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});