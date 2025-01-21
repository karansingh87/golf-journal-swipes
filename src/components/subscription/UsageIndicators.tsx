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
        .select('subscription_tier, has_pro_access')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!profile) return null;

  const isUnlimited = profile.has_pro_access || profile.subscription_tier === 'lifetime';

  const features = [
    {
      name: 'Recordings',
      unlimited: true,
      key: 'recordings'
    },
    {
      name: 'Pep Talks',
      unlimited: isUnlimited,
      key: 'pepTalks'
    },
    {
      name: 'Coach Notes',
      unlimited: isUnlimited,
      key: 'coachNotes'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Feature Access</h3>
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{feature.name}</span>
              <span className="text-muted-foreground">
                {feature.unlimited ? '∞' : 'Pro Feature'}
              </span>
            </div>
            {!feature.unlimited && (
              <Progress 
                value={0} 
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