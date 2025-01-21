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
export const canUseFeature = (profile: Partial<Profile> | null, feature: 'trends' | 'pepTalks' | 'coachNotes'): boolean => {
  // Free users can't access these features
  if (!profile?.id) return false;
  return profile.has_pro_access === true;
};

// Helper function to check remaining usage (always returns true for free features)
export const getRemainingUsage = (profile: Partial<Profile> | null) => {
  return {
    recordings: true, // All users have unlimited recordings
    pepTalks: profile?.has_pro_access || false,
    coachNotes: profile?.has_pro_access || false,
    trends: profile?.has_pro_access || false
  };
};