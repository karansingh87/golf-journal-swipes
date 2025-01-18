import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeModal } from "./subscription/UpgradeModal";
import { Loader2 } from "lucide-react";

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
        .select('subscription_tier')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 30, // Cache for 30 seconds
  });

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  // Loading state guard - moved to top level for visibility
  if (isProfileLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <p className="text-zinc-600 text-sm font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Ensure we have profile data before proceeding
  if (!profile) {
    console.error('No profile data available');
    return null;
  }

  const isProUser = () => {
    return profile.subscription_tier === 'pro';
  };

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    if (!isProUser()) {
      setShowUpgradeModal(true);
      return;
    }
    await handleTextSubmit(text, type);
    setShowTextInput(false);
  };

  const handleRecordingStart = () => {
    if (!isProUser()) {
      setShowUpgradeModal(true);
      return;
    }
    setShowSessionTypeModal(true);
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = () => {
    if (!isProUser()) {
      setShowUpgradeModal(true);
      return;
    }
    setShowTextInput(true);
  };

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