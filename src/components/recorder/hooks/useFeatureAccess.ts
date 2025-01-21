import { canUseFeature, incrementUsage } from "@/utils/subscription";
import { supabase } from "@/integrations/supabase/client";

export const useFeatureAccess = () => {
  const checkFeatureAccess = async (profile: any) => {
    if (!profile) return false;
    
    // Pro users bypass usage checks
    if (profile.has_pro_access) {
      return true;
    }

    return await canUseFeature(profile, 'recordings', supabase);
  };

  const incrementFeatureUsage = async (profile: any) => {
    if (!profile || profile.has_pro_access) return;
    await incrementUsage(profile, 'recordings', supabase);
  };

  return { checkFeatureAccess, incrementFeatureUsage };
};