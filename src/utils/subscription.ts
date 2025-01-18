import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const isSubscriptionActive = (profile: Profile | null) => {
  return profile?.subscription_status === 'active' || 
         profile?.subscription_status === 'trialing';
};