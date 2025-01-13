import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { Card } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";
import { differenceInDays } from "date-fns";

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

  const isProUser = profile?.subscription_status === 'active' && 
                    profile?.subscription_tier === 'pro';
  
  const isTrialUser = profile?.subscription_status === 'trialing';

  const trialEnd = profile?.trial_end ? new Date(profile.trial_end) : null;
  const subscriptionEnd = profile?.current_period_end ? new Date(profile.current_period_end) : null;

  const daysRemaining = isTrialUser && trialEnd
    ? differenceInDays(trialEnd, new Date())
    : isProUser && subscriptionEnd
      ? differenceInDays(subscriptionEnd, new Date())
      : 0;

  const getSubscriptionStatus = () => {
    if (isProUser) return { label: "Pro", color: "text-green-600" };
    if (isTrialUser) return { label: "Trial", color: "text-blue-600" };
    if (profile?.subscription_status === 'canceled') return { label: "Canceled", color: "text-red-600" };
    if (profile?.subscription_status === 'past_due') return { label: "Past Due", color: "text-amber-600" };
    return { label: "Free", color: "text-zinc-600" };
  };

  const status = getSubscriptionStatus();

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
            
            {(isTrialUser || isProUser) && daysRemaining > 0 && (
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
              {isProUser 
                ? 'You have access to all premium features'
                : 'Upgrade to Pro for unlimited access'}
            </p>
          </div>

          {isProUser ? (
            <ManageSubscriptionButton />
          ) : (
            <>
              <div className="space-y-4">
                <h4 className="font-medium">Pro Plan Benefits:</h4>
                <ul className="space-y-3">
                  {[
                    'Unlimited voice recordings',
                    'Advanced AI analysis',
                    'Detailed performance insights',
                    'Priority customer support',
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

              <UpgradeButton />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};