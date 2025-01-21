import { useState, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UpgradeModal } from "./subscription/UpgradeModal";
import { canUseFeature } from "@/utils/subscription";
import { useToast } from "./ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();
  
  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  useEffect(() => {
    if (!session?.user?.id) {
      navigate('/login');
    }
  }, [session, navigate]);

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No authenticated user');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('has_pro_access, monthly_recordings_count')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // Don't render anything while loading or if no session
  if (!session?.user?.id || !profile) {
    return null;
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    try {
      await handleTextSubmit(text, type);
      setShowTextInput(false);
    } catch (error) {
      console.error('Error handling text submit:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your note. Please try again.",
      });
    }
  };

  const handleRecordingStart = async () => {
    if (!profile.has_pro_access) {
      const canUse = await canUseFeature(profile, 'recordings', supabase);
      if (!canUse) {
        setShowUpgradeModal(true);
        return;
      }
    }
    setShowSessionTypeModal(true);
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = async () => {
    if (!profile.has_pro_access) {
      const canUse = await canUseFeature(profile, 'recordings', supabase);
      if (!canUse) {
        setShowUpgradeModal(true);
        return;
      }
    }
    setShowTextInput(true);
  };

  const handleUpgradeModalContinue = () => {
    setShowUpgradeModal(false);
    setShowSessionTypeModal(true);
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