import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const UsageIndicators = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier, monthly_recordings_count, monthly_pep_talks_count, monthly_coach_notes_count')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const getFreeLimit = (feature: string) => {
    switch (feature) {
      case 'recordings':
        return 3;
      case 'pepTalks':
      case 'coachNotes':
        return 1;
      default:
        return 0;
    }
  };

  const getProgress = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const features = [
    {
      name: 'Recordings',
      used: profile?.monthly_recordings_count || 0,
      limit: getFreeLimit('recordings'),
      key: 'recordings'
    },
    {
      name: 'Pep Talks',
      used: profile?.monthly_pep_talks_count || 0,
      limit: getFreeLimit('pepTalks'),
      key: 'pepTalks'
    },
    {
      name: 'Coach Notes',
      used: profile?.monthly_coach_notes_count || 0,
      limit: getFreeLimit('coachNotes'),
      key: 'coachNotes'
    }
  ];

  if (!profile) return null;

  const isUnlimited = profile.subscription_tier === 'pro' || profile.subscription_tier === 'lifetime';

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Usage</h3>
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{feature.name}</span>
              <span className="text-muted-foreground">
                {isUnlimited ? '∞' : `${feature.used} / ${feature.limit}`}
              </span>
            </div>
            {!isUnlimited && (
              <Progress 
                value={getProgress(feature.used, feature.limit)} 
                className="h-2"
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UsageIndicators;