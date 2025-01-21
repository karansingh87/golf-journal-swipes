import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const isSubscriptionActive = (profile: Partial<Profile> | null) => {
  if (!profile?.id) return false;
  return profile.has_pro_access === true;
};

export const canAccessProFeature = (profile: Partial<Profile> | null): boolean => {
  return isSubscriptionActive(profile);
};

export const canAccessRecording = (profile: Partial<Profile> | null): boolean => {
  // All users can access recording feature
  return !!profile?.id;
};