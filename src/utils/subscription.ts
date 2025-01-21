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
  if (!profile) return false;
  return profile.has_pro_access === true;
};

export const shouldResetUsage = (lastResetDate: Date | null): boolean => {
  if (!lastResetDate) return true;
  
  const nextResetDate = new Date(lastResetDate);
  nextResetDate.setMonth(nextResetDate.getMonth() + 1);
  return new Date() > nextResetDate;
};

export const getRemainingUsage = (profile: Partial<Profile> | null): UsageLimit => {
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
  if (!profile) return false;
  
  // Pro users have unlimited access
  if (isSubscriptionActive(profile)) return true;

  // Check if we need to reset usage counts
  if (shouldResetUsage(profile.last_reset_date ? new Date(profile.last_reset_date) : null)) {
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
      return false;
    }

    // Return true since we just reset the counters
    return true;
  }

  // Check remaining usage for the specific feature
  const remaining = getRemainingUsage(profile);
  return remaining[feature] > 0;
};

export const incrementUsage = async (
  profile: Partial<Profile> | null,
  feature: keyof UsageLimit,
  supabase: any
): Promise<void> => {
  if (!profile || isSubscriptionActive(profile)) return;

  const columnMap = {
    recordings: 'monthly_recordings_count',
    pepTalks: 'monthly_pep_talks_count',
    coachNotes: 'monthly_coach_notes_count',
  };

  const column = columnMap[feature];
  const currentValue = profile[column as keyof Profile] as number || 0;

  const { error } = await supabase
    .from('profiles')
    .update({ [column]: currentValue + 1 })
    .eq('id', profile.id);

  if (error) {
    console.error(`Error incrementing ${feature} usage:`, error);
    throw error;
  }
};