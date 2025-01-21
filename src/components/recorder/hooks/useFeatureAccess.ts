import { canUseFeature, incrementUsage } from "@/utils/subscription";
import { supabase } from "@/integrations/supabase/client";

export const useFeatureAccess = () => {
  const checkFeatureAccess = async (profile: any) => {
    if (!profile) return false;
    
    // Pro users always have access
    if (profile.has_pro_access) {
      return true;
    }

    // Check remaining usage for free users
    return await canUseFeature(profile, 'recordings', supabase);
  };

  const incrementFeatureUsage = async (profile: any) => {
    // Only increment usage for free users
    if (!profile || profile.has_pro_access) return;
    
    try {
      await incrementUsage(profile, 'recordings', supabase);
    } catch (error) {
      console.error('Error incrementing feature usage:', error);
    }
  };

  return { checkFeatureAccess, incrementFeatureUsage };
};