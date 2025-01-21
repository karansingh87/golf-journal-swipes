import { canUseFeature, incrementUsage } from "@/utils/subscription";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useFeatureAccess = () => {
  const { toast } = useToast();

  const checkFeatureAccess = async (profile: any) => {
    if (!profile) return false;
    
    try {
      // Pro users always have access
      if (profile.has_pro_access) {
        return true;
      }

      // Check remaining usage for free users
      return await canUseFeature(profile, 'recordings', supabase);
    } catch (error) {
      console.error('Error checking feature access:', error);
      toast({
        title: "Error",
        description: "Could not verify feature access. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const incrementFeatureUsage = async (profile: any) => {
    // Only increment usage for free users
    if (!profile || profile.has_pro_access) return;
    
    try {
      await incrementUsage(profile, 'recordings', supabase);
    } catch (error) {
      console.error('Error incrementing feature usage:', error);
      toast({
        title: "Error",
        description: "Could not update usage count. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { checkFeatureAccess, incrementFeatureUsage };
};