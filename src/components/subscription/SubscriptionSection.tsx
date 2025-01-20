import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { Card } from "@/components/ui/card";
import { Check, AlertCircle, ArrowRight, Settings, RefreshCw } from "lucide-react";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";

const MONTHLY_PRICE_ID = "price_1QjBd2LbszPXbxPVv7deyKtT";

export const SubscriptionSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_status, current_period_end, trial_end')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const isTrialUser = profile?.subscription_status === 'trialing';
  const isActiveUser = profile?.subscription_status === 'active';
  const isPastDue = profile?.subscription_status === 'past_due';
  const isCanceled = profile?.subscription_status === 'canceled';

  const trialEnd = profile?.trial_end ? new Date(profile.trial_end) : null;
  const subscriptionEnd = profile?.current_period_end ? new Date(profile.current_period_end) : null;

  const daysRemaining = isTrialUser && trialEnd
    ? differenceInDays(trialEnd, new Date())
    : isActiveUser && subscriptionEnd
      ? differenceInDays(subscriptionEnd, new Date())
      : 0;

  const getSubscriptionStatus = () => {
    if (isActiveUser) return { label: "Pro", color: "text-green-600" };
    if (isTrialUser) return { label: "Trial", color: "text-blue-600" };
    if (isCanceled) return { label: "Canceled", color: "text-red-600" };
    if (isPastDue) return { label: "Past Due", color: "text-amber-600" };
    return { label: "Inactive", color: "text-zinc-600" };
  };

  const status = getSubscriptionStatus();

  const renderSubscriptionButton = () => {
    if (isTrialUser) {
      return (
        <Button
          onClick={() => window.location.href = '/checkout'} // You'll need to implement the checkout page
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Subscribe Now
        </Button>
      );
    }

    if (isActiveUser) {
      return <ManageSubscriptionButton />;
    }

    if (isPastDue || isCanceled) {
      return (
        <Button
          onClick={() => window.location.href = '/checkout'}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reactivate Subscription
        </Button>
      );
    }

    return <UpgradeButton priceId={MONTHLY_PRICE_ID} />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Subscription
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">
                Current Plan: <span className={status.color}>{status.label}</span>
              </h3>
            </div>
            
            {(isTrialUser || isActiveUser) && daysRemaining > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span>
                  {isTrialUser
                    ? `${daysRemaining} days remaining in your trial`
                    : `Your subscription renews in ${daysRemaining} days`}
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              {isActiveUser 
                ? 'You have access to all premium features'
                : isTrialUser
                  ? 'Subscribe to keep your golf insights flowing'
                  : 'Subscribe to unlock your personal golf improvement playbook'}
            </p>
          </div>

          {renderSubscriptionButton()}

          {!isActiveUser && !isTrialUser && (
            <div className="space-y-4">
              <ul className="space-y-3">
                {[
                  'Unlimited voice recordings & storage',
                  'Advanced AI swing analysis & insights',
                  'Personalized improvement recommendations',
                  'Mental game coaching & pep talks',
                  'Trend analysis & progress tracking',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <div className="rounded-full p-1 bg-zinc-900">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};