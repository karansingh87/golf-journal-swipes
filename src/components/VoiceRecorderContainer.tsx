import { useState, useEffect } from "react";
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
      console.log('Fetching profile data...');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id);
      
      if (!user) {
        console.log('No user found');
        throw new Error('No user found');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Profile data received:', data);
      return data;
    },
    retry: 1
  });

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  // Debug logs for component state
  useEffect(() => {
    console.log('Profile loading state:', isProfileLoading);
    console.log('Current profile data:', profile);
  }, [isProfileLoading, profile]);

  if (isProfileLoading) {
    console.log('Showing loading state');
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-golf-green/80 text-sm font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    console.log('Handling text submit with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
      setShowUpgradeModal(true);
      return;
    }
    await handleTextSubmit(text, type);
    setShowTextInput(false);
  };

  const handleRecordingStart = () => {
    console.log('Handling recording start with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
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
    console.log('Handling switch to text with profile:', profile);
    if (!profile || profile.subscription_tier !== 'pro') {
      console.log('Showing upgrade modal - not pro user');
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