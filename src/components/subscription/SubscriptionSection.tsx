import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export const SubscriptionSection = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_status')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const isProUser = profile?.subscription_tier === 'pro' && 
                    profile?.subscription_status === 'active';

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
          <div>
            <h3 className="text-lg font-medium">
              Current Plan: {isProUser ? 'Pro' : 'Starter'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isProUser 
                ? 'You have access to all premium features'
                : 'Upgrade to Pro for unlimited access'}
            </p>
          </div>

          {!isProUser && (
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