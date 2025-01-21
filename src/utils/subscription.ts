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

export const canUseFeature = (profile: Partial<Profile> | null, feature: 'trends' | 'pepTalks' | 'coachNotes'): boolean => {
  // Pro users can access all features
  if (profile?.has_pro_access) return true;
  
  // Free users can't access these features
  return false;
};

export const getRemainingUsage = (profile: Partial<Profile> | null) => {
  const hasProAccess = profile?.has_pro_access || false;
  
  return {
    recordings: true, // All users have unlimited recordings
    pepTalks: hasProAccess,
    coachNotes: hasProAccess,
    trends: hasProAccess
  };
};

// Since all features are now unlimited for pro users and recordings are unlimited for all users,
// we don't need to track usage anymore
export const incrementUsage = async () => {
  // This is now a no-op function since we don't track usage
  return Promise.resolve();
};