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

// Function to check if user can access a specific feature
export const canAccessFeature = (feature: 'trends' | 'pep-talk' | 'lesson-prep'): (profile: Partial<Profile> | null) => boolean => {
  return (profile: Partial<Profile> | null) => {
    // Free users can't access these features
    if (!profile?.id) return false;
    return profile.has_pro_access === true;
  };
};