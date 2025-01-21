import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeModal } from "./subscription/UpgradeModal";
import { canUseFeature, incrementUsage } from "@/utils/subscription";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    retry: 2,
    staleTime: 1000 * 60, // 1 minute
  });

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    if (!profile) return;

    // Pro/Lifetime users bypass usage checks
    if (profile.subscription_tier === 'pro' || profile.subscription_tier === 'lifetime') {
      await handleTextSubmit(text, type);
      setShowTextInput(false);
      return;
    }

    const canUse = await canUseFeature(profile, 'recordings', supabase);
    if (canUse) {
      await handleTextSubmit(text, type);
      await incrementUsage(profile, 'recordings', supabase);
      setShowTextInput(false);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleRecordingStart = async () => {
    if (!profile || isProfileLoading) return;

    // Pro/Lifetime users bypass usage checks
    if (profile.subscription_tier === 'pro' || profile.subscription_tier === 'lifetime') {
      setShowSessionTypeModal(true);
      return;
    }

    const canUse = await canUseFeature(profile, 'recordings', supabase);
    if (canUse) {
      // They have available credits, let them record
      setShowSessionTypeModal(true);
    } else {
      // No credits left, show upgrade modal
      setShowUpgradeModal(true);
    }
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = async () => {
    if (!profile || isProfileLoading) return;

    // Pro/Lifetime users bypass usage checks
    if (profile.subscription_tier === 'pro' || profile.subscription_tier === 'lifetime') {
      setShowTextInput(true);
      return;
    }

    const canUse = await canUseFeature(profile, 'recordings', supabase);
    if (canUse) {
      setShowTextInput(true);
    } else {
      setShowUpgradeModal(true);
    }
  };

  // Don't render anything while profile is loading to prevent flashing modals
  if (isProfileLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden">
      {showTextInput ? (
        <TextInput
          onSubmit={handleTextSubmitAndClose}
          onCancel={() => setShowTextInput(false)}
          isProcessing={isProcessingText}
        />
      ) : (
        <div className="flex-1 flex flex-col h-[100dvh] relative">
          <VoiceRecorder
            isTranscribing={isTranscribing}
            transcription={transcription}
            onRecordingComplete={handleAudioRecording}
            onSwitchToText={handleSwitchToText}
            onRecordingStart={handleRecordingStart}
            sessionType={sessionType}
            autoStartRecording={true}
          />
          <SessionTypeModal 
            isOpen={showSessionTypeModal}
            onClose={() => setShowSessionTypeModal(false)}
            onSelect={handleSessionTypeSelect}
          />
          <UpgradeModal
            feature="recording"
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;