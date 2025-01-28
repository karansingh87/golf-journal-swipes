import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';
import { UpgradeModal } from '@/components/subscription/UpgradeModal';
import { Badge } from '@/components/ui/badge';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
  onPepTalkClick: () => void;
}

const PlaybookActions = ({ onGenerateClick, onPepTalkClick }: PlaybookActionsProps) => {
  const [upgradeFeature, setUpgradeFeature] = useState<'trends' | 'pep-talk' | 'lesson-prep' | 'recording' | null>(null);
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('has_pro_access, subscription_tier')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: recordingsCount } = useQuery({
    queryKey: ['recordings_count'],
    queryFn: async () => {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count, error } = await supabase
        .from('recordings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      if (error) throw error;
      return count || 0;
    },
    enabled: !profile?.has_pro_access,
  });

  const MONTHLY_LIMIT = 3;
  const isAtLimit = !profile?.has_pro_access && (recordingsCount || 0) >= MONTHLY_LIMIT;

  const handleRecordClick = () => {
    if (isAtLimit) {
      setUpgradeFeature('recording');
    } else {
      navigate('/record');
    }
  };

  const handleFeatureClick = (feature: 'trends' | 'pep-talk' | 'lesson-prep') => {
    if (!profile) return;

    // Pro users bypass all checks
    if (profile.has_pro_access) {
      handleFeatureAction(feature);
      return;
    }

    setUpgradeFeature(feature);
  };

  const handleFeatureAction = (feature: 'trends' | 'pep-talk' | 'lesson-prep') => {
    switch (feature) {
      case 'trends':
        navigate('/trends');
        break;
      case 'pep-talk':
        onPepTalkClick();
        break;
      case 'lesson-prep':
        onGenerateClick();
        break;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handleRecordClick}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Record Note
            {!profile?.has_pro_access && (
              <Badge variant="secondary" className="ml-2">
                {recordingsCount || 0}/{MONTHLY_LIMIT} this month
              </Badge>
            )}
          </button>
        </div>
        <PlaceholderCard />
        <TrendsCard onClick={() => handleFeatureClick('trends')} />
        <NewPlaceholderCard onClick={() => handleFeatureClick('pep-talk')} />
        <GenerateNotesCard onClick={() => handleFeatureClick('lesson-prep')} />
      </div>

      <UpgradeModal
        feature={upgradeFeature || 'trends'}
        isOpen={!!upgradeFeature}
        onClose={() => setUpgradeFeature(null)}
        onContinue={() => {
          if (upgradeFeature) {
            handleFeatureAction(upgradeFeature);
          }
        }}
      />
    </>
  );
};

export default PlaybookActions;