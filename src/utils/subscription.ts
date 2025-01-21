import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UsageLimit {
  recordings: number;
  pepTalks: number;
  coachNotes: number;
}

const FREE_TIER_LIMITS: UsageLimit = {
  recordings: 3,
  pepTalks: 1,
  coachNotes: 1,
};

export const isSubscriptionActive = (profile: Partial<Profile> | null) => {
  if (!profile?.id) return false;
  return profile.has_pro_access === true;
};

export const shouldResetUsage = (lastResetDate: Date | null): boolean => {
  if (!lastResetDate) return true;
  
  const now = new Date();
  const resetDate = new Date(lastResetDate);
  const monthDiff = (now.getFullYear() - resetDate.getFullYear()) * 12 + 
                   (now.getMonth() - resetDate.getMonth());
                   
  return monthDiff >= 1;
};

export const getRemainingUsage = (profile: Partial<Profile> | null): UsageLimit => {
  if (!profile?.id) {
    return {
      recordings: 0,
      pepTalks: 0,
      coachNotes: 0,
    };
  }

  if (isSubscriptionActive(profile)) {
    return {
      recordings: Infinity,
      pepTalks: Infinity,
      coachNotes: Infinity,
    };
  }

  return {
    recordings: Math.max(0, FREE_TIER_LIMITS.recordings - (profile?.monthly_recordings_count || 0)),
    pepTalks: Math.max(0, FREE_TIER_LIMITS.pepTalks - (profile?.monthly_pep_talks_count || 0)),
    coachNotes: Math.max(0, FREE_TIER_LIMITS.coachNotes - (profile?.monthly_coach_notes_count || 0)),
  };
};

export const canUseFeature = async (
  profile: Partial<Profile> | null,
  feature: keyof UsageLimit,
  supabase: any
): Promise<boolean> => {
  if (!profile?.id) {
    console.error('No valid profile ID provided to canUseFeature');
    return false;
  }
  
  // Pro users always have access
  if (isSubscriptionActive(profile)) return true;

  // Check if we need to reset usage counts for free users
  if (shouldResetUsage(profile.last_reset_date ? new Date(profile.last_reset_date) : null)) {
    console.log('Resetting usage counts for user:', profile.id);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          monthly_recordings_count: 0,
          monthly_pep_talks_count: 0,
          monthly_coach_notes_count: 0,
          last_reset_date: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) {
        console.error('Error resetting usage:', error);
        throw error;
      }

      // Update local profile counts
      profile.monthly_recordings_count = 0;
      profile.monthly_pep_talks_count = 0;
      profile.monthly_coach_notes_count = 0;
      profile.last_reset_date = new Date().toISOString();
    } catch (error) {
      console.error('Error in reset operation:', error);
      throw error;
    }
  }

  // Check remaining usage for free users
  const remaining = getRemainingUsage(profile);
  return remaining[feature] > 0;
};

export const incrementUsage = async (
  profile: Partial<Profile> | null,
  feature: keyof UsageLimit,
  supabase: any
): Promise<void> => {
  if (!profile?.id) {
    console.error('No valid profile ID provided to incrementUsage');
    return;
  }

  // Don't increment usage for pro users
  if (isSubscriptionActive(profile)) return;

  const columnMap = {
    recordings: 'monthly_recordings_count',
    pepTalks: 'monthly_pep_talks_count',
    coachNotes: 'monthly_coach_notes_count',
  };

  const column = columnMap[feature];
  const currentValue = profile[column as keyof Profile] as number || 0;

  console.log(`Incrementing ${feature} usage for user:`, profile.id, 'Current value:', currentValue);

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ [column]: currentValue + 1 })
      .eq('id', profile.id);

    if (error) {
      console.error(`Error incrementing ${feature} usage:`, error);
      throw error;
    }

    // Update local profile count
    profile[column as keyof Profile] = (currentValue + 1) as never;
  } catch (error) {
    console.error(`Failed to increment ${feature} usage:`, error);
    throw error;
  }
};