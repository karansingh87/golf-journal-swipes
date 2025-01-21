import { useState, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import SessionTypeModal from "./SessionTypeModal";
import { useProfileData } from "./recorder/hooks/useProfileData";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { canAccessRecording } from "@/utils/subscription";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();
  const { profile, isProfileLoading } = useProfileData();
  
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

  // Don't render anything while loading or if no session
  if (!session?.user?.id || isProfileLoading || !profile) {
    return null;
  }

  // Check if user can access recording feature
  if (!canAccessRecording(profile)) {
    navigate('/');
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

  const handleRecordingStart = () => {
    setShowSessionTypeModal(true);
  };

  const handleSessionTypeSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionTypeModal(false);
  };

  const handleSwitchToText = () => {
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
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;