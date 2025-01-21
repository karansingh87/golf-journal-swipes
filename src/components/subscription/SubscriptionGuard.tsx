import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeButton } from "./UpgradeButton";
import { Card } from "@/components/ui/card";
import { Crown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MONTHLY_PRICE_ID = "price_1QjbKgLbszPXbxPVjqNTDLHQ";

interface SubscriptionGuardProps {
  children: React.ReactNode;
  feature?: 'recordings' | 'pepTalks' | 'coachNotes';
}

export const SubscriptionGuard = ({ children, feature }: SubscriptionGuardProps) => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, has_pro_access')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-zinc-800 rounded-full animate-spin border-t-transparent" />
      </div>
    );
  }

  // If no feature is specified or user is pro/lifetime, render children
  if (!feature || profile?.has_pro_access || profile?.subscription_tier === 'lifetime') {
    return <>{children}</>;
  }

  // Otherwise show upgrade modal
  return (
    <div className="relative min-h-screen">
      {children}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 backdrop-blur-[2px] bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="w-full max-w-sm p-6 space-y-4 relative bg-white/95 backdrop-blur-sm shadow-lg border-zinc-200/80">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-zinc-100 rounded-full">
                <Crown className="h-5 w-5 text-zinc-800" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-800">
                Upgrade Required
              </h2>
            </div>
            
            <p className="text-sm text-zinc-600 leading-relaxed">
              Get unlimited access to all features and take your golf game to the next level with personalized insights and advanced analytics.
            </p>
            
            <div className="pt-2">
              <UpgradeButton 
                priceId={MONTHLY_PRICE_ID}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
              />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
