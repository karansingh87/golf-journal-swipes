import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export const SubscriptionGuard = ({ children }: SubscriptionGuardProps) => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      console.log('Profile query running for user:', session?.user?.id);
      
      if (!session?.user?.id) {
        console.log('No user ID available');
        return null;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Profile data received:', data);
      return data;
    },
    enabled: !!session?.user?.id,
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 1000 * 60 * 5, // Keep in cache for 5 minutes (renamed from cacheTime)
    retry: 2,
  });

  // If not logged in, redirect to login
  if (!session) {
    console.log('No session, redirecting to login');
    navigate('/login');
    return null;
  }

  // Show loading state
  if (isLoading) {
    console.log('Loading profile data...');
    return <div>Loading...</div>;
  }

  const isPro = profile?.subscription_tier === 'pro';
  console.log('Final profile check:', {
    profile,
    subscriptionTier: profile?.subscription_tier,
    isPro
  });

  // If subscription is pro, show content
  if (isPro) {
    console.log('Pro user, showing content');
    return <>{children}</>;
  }

  // Otherwise show upgrade modal
  console.log('Non-pro user, showing upgrade modal');
  return (
    <div className="relative min-h-screen">
      {children}
      <div className="fixed inset-0 backdrop-blur-md bg-black/50 z-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 space-y-4 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
          
          <h2 className="text-2xl font-semibold">Upgrade to Pro</h2>
          <p className="text-muted-foreground">
            Get unlimited access to all features and take your golf game to the next level.
          </p>
          
          <div className="pt-4">
            <UpgradeButton 
              showTrial={false}
              className="w-full"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};