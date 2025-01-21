import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { differenceInDays } from "date-fns";

const MONTHLY_PRICE_ID = "price_1QjBd2LbszPXbxPVv7deyKtT";

export const SubscriptionSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, current_period_end')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const isProUser = profile?.subscription_tier === 'pro';
  const isLifetimeUser = profile?.subscription_tier === 'lifetime';
  const hasFullAccess = isProUser || isLifetimeUser;
  
  const subscriptionEnd = profile?.current_period_end ? new Date(profile.current_period_end) : null;
  const daysRemaining = isProUser && subscriptionEnd
    ? differenceInDays(subscriptionEnd, new Date())
    : 0;

  const getSubscriptionLabel = () => {
    if (isLifetimeUser) return { label: "Lifetime", color: "text-violet-600" };
    if (isProUser) return { label: "Pro", color: "text-green-600" };
    return { label: "Free", color: "text-zinc-600" };
  };

  const status = getSubscriptionLabel();

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
            
            {isProUser && daysRemaining > 0 && (
              <p className="text-sm text-muted-foreground">
                Your subscription renews in {daysRemaining} days
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              {hasFullAccess 
                ? isLifetimeUser
                  ? 'You have permanent access to all premium features'
                  : 'You have access to all premium features'
                : 'Subscribe to unlock your personal golf improvement playbook'}
            </p>
          </div>

          {hasFullAccess ? (
            !isLifetimeUser && <ManageSubscriptionButton />
          ) : (
            <>
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

              <UpgradeButton priceId={MONTHLY_PRICE_ID} />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};