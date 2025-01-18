import { Profile } from "@/integrations/supabase/types";

export const isSubscriptionActive = (profile: Profile | null) => {
  return profile?.subscription_status === 'active' || 
         profile?.subscription_status === 'trialing';
};