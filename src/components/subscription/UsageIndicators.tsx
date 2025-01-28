import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const UsageIndicators = () => {
  const [monthlyUsage, setMonthlyUsage] = useState<number | null>(null);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, subscription_tier, has_pro_access')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Fetch monthly usage for free users
  useEffect(() => {
    const fetchMonthlyUsage = async () => {
      if (!profile || profile.has_pro_access) return;

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)
        .gte('created_at', startOfMonth.toISOString());

      setMonthlyUsage(count || 0);
    };

    fetchMonthlyUsage();
  }, [profile]);

  if (!profile) return null;

  const isUnlimited = profile.has_pro_access || profile.subscription_tier === 'lifetime';

  const features = [
    {
      name: 'Recordings',
      unlimited: isUnlimited,
      key: 'recordings',
      current: monthlyUsage,
      max: 3
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
                {feature.unlimited ? '∞' : feature.key === 'recordings' 
                  ? `${feature.current || 0}/${feature.max} this month`
                  : 'Pro Feature'}
              </span>
            </div>
            {!feature.unlimited && (
              <Progress 
                value={feature.key === 'recordings' ? ((feature.current || 0) / feature.max) * 100 : 0} 
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