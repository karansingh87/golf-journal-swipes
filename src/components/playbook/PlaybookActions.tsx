import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import GenerateNotesCard from './GenerateNotesCard';
import TrendsCard from './TrendsCard';
import PlaceholderCard from './PlaceholderCard';
import NewPlaceholderCard from './NewPlaceholderCard';
import RecordPlaceholderCard from './RecordPlaceholderCard';
import { UpgradeModal } from '@/components/subscription/UpgradeModal';

interface PlaybookActionsProps {
  onGenerateClick: () => void;
  onPepTalkClick: () => void;
}

const PlaybookActions = ({ onGenerateClick, onPepTalkClick }: PlaybookActionsProps) => {
  const [upgradeFeature, setUpgradeFeature] = useState<'trends' | 'pep-talk' | 'lesson-prep' | 'recording' | null>(null);
  const navigate = useNavigate();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
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

  const handleRecordClick = () => {
    navigate('/record');
  };

  const handleFeatureClick = (feature: 'trends' | 'pep-talk' | 'lesson-prep') => {
    // Don't show upgrade modal while profile is loading
    if (isProfileLoading) return;
    
    if (!profile) return;

    // Pro users bypass all checks
    if (profile.has_pro_access) {
      handleFeatureAction(feature);
      return;
    }

    setUpgradeFeature(feature);
  };

  const handleFeatureAction = (feature: 'trends' | 'pep-talk' | 'lesson-prep' | 'recording') => {
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
      case 'recording':
        navigate('/record');
        break;
    }
  };

  // Show loading state while profile data is being fetched
  if (isProfileLoading) {
    return (
      <div className="grid grid-cols-1 gap-2.5 pt-10 opacity-50">
        <RecordPlaceholderCard />
        <PlaceholderCard />
        <TrendsCard onClick={() => {}} />
        <NewPlaceholderCard onClick={() => {}} />
        <GenerateNotesCard onClick={() => {}} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 pt-10">
        <RecordPlaceholderCard />
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