import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';
import { handleError, handleSuccess } from '../_shared/responseUtils.ts';
import Stripe from 'https://esm.sh/stripe@14.12.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the user from Supabase auth
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Get the user's stripe_customer_id from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_customer_id, subscription_status')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.stripe_customer_id) {
      throw new Error('No Stripe customer found');
    }

    console.log('Creating portal session for customer:', profile.stripe_customer_id, 'Status:', profile.subscription_status);

    // Create the portal session with enhanced configuration for trial users
    const { url } = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${req.headers.get('origin')}/settings`,
      flow_data: {
        type: 'subscription_flow',
        after_completion: { type: 'hosted_confirmation' }
      },
      features: {
        payment_method_update: {
          enabled: true,
        },
        subscription_cancel: {
          enabled: true,
          mode: 'immediately',
          proration_behavior: 'always_invoice',
        },
        subscription_pause: {
          enabled: false,
        },
        subscription_update: {
          enabled: true,
          proration_behavior: 'always_invoice',
          default_allowed_updates: ['price', 'promotion_code'],
          products: ['prod_*']
        },
        customer_update: {
          enabled: true,
          allowed_updates: ['email', 'name', 'tax_id'],
        },
        invoice_history: {
          enabled: true,
        },
        promotion_code: {
          enabled: true,
          subscription_behavior: {
            type: 'apply_immediately',
            missing_payment_method_behavior: { type: 'require_payment_method' }
          }
        },
      },
    });

    return handleSuccess({ url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return handleError(error);
  }
});