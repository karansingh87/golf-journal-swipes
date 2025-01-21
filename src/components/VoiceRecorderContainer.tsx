import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeModal } from "./subscription/UpgradeModal";
import { canUseFeature, incrementUsage } from "@/utils/subscription";
import { useToast } from "./ui/use-toast";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();
  
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error('No user found');

        const { data, error } = await supabase
          .from('profiles')
          .select('has_pro_access, monthly_recordings_count')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        if (!data) {
          throw new Error('No profile found');
        }

        return data;
      } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
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

    // Pro users bypass usage checks
    if (profile.has_pro_access) {
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

    // Pro users bypass usage checks
    if (profile.has_pro_access) {
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

    // Pro users bypass usage checks
    if (profile.has_pro_access) {
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

  // Show error state
  if (profileError) {
    toast({
      title: "Error loading profile",
      description: "Please try refreshing the page",
      variant: "destructive",
    });
    return null;
  }

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