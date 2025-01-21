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
import { useSession } from "@supabase/auth-helpers-react";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  
  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();
  
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error('No authenticated user');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('has_pro_access, monthly_recordings_count')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('No profile found');
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (profileError) {
    toast({
      title: "Error loading profile",
      description: "Please try refreshing the page",
      variant: "destructive",
    });
    return null;
  }

  if (isProfileLoading || !profile) {
    return null;
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    if (!profile) return;

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
    if (!profile) return;

    if (profile.has_pro_access) {
      setShowSessionTypeModal(true);
      return;
    }

    const canUse = await canUseFeature(profile, 'recordings', supabase);
    if (canUse) {
      setShowSessionTypeModal(true);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = async () => {
    if (!profile) return;

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

  const handleUpgradeModalContinue = async () => {
    if (!profile) return;
    
    const canUse = await canUseFeature(profile, 'recordings', supabase);
    if (canUse) {
      setShowUpgradeModal(false);
      setShowSessionTypeModal(true);
    }
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
            onContinue={handleUpgradeModalContinue}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;