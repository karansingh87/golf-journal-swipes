import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';
import { UpgradeModal } from '@/components/subscription/UpgradeModal';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
  onPepTalkClick: () => void;
}

const PlaybookActions = ({ onGenerateClick, onPepTalkClick }: PlaybookActionsProps) => {
  const [upgradeFeature, setUpgradeFeature] = useState<'trends' | 'pep-talk' | 'lesson-prep' | null>(null);
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const isProUser = profile?.subscription_tier === 'pro';

  const handleFeatureClick = (feature: 'trends' | 'pep-talk' | 'lesson-prep') => {
    if (!isProUser) {
      setUpgradeFeature(feature);
      return;
    }

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
        <PlaceholderCard />
        <TrendsCard onClick={() => handleFeatureClick('trends')} />
        <NewPlaceholderCard onClick={() => handleFeatureClick('pep-talk')} />
        <GenerateNotesCard onClick={() => handleFeatureClick('lesson-prep')} />
      </div>

      <UpgradeModal
        feature={upgradeFeature || 'trends'}
        isOpen={!!upgradeFeature}
        onClose={() => setUpgradeFeature(null)}
      />
    </>
  );
};

export default PlaybookActions;