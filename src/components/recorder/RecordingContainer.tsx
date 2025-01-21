import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "../VoiceRecorder";
import TextInput from "../TextInput";
import { useGolfRecording } from "../../hooks/useGolfRecording";
import SessionTypeModal from "../SessionTypeModal";
import { UpgradeModal } from "../subscription/UpgradeModal";
import { useProfileData } from "./hooks/useProfileData";
import { canAccessRecording } from "@/utils/subscription";

const RecordingContainer = () => {
  console.log("RecordingContainer mounting");
  const navigate = useNavigate();
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { profile, isProfileLoading, isAuthenticated } = useProfileData();
  
  console.log("Auth state:", { isAuthenticated, isProfileLoading, profile });

  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  // Redirect to login if not authenticated
  useEffect(() => {
    console.log("Auth check effect running", { isAuthenticated, isProfileLoading });
    if (!isAuthenticated && !isProfileLoading) {
      console.log("Redirecting to login - not authenticated");
      navigate('/login');
    }
  }, [isAuthenticated, isProfileLoading, navigate]);

  // Don't render anything while checking authentication or if not authenticated
  if (isProfileLoading || !isAuthenticated || !profile) {
    console.log("Early return - loading or not authenticated", { isProfileLoading, isAuthenticated, profile });
    return null;
  }

  // Check if user can access recording feature
  if (!canAccessRecording(profile)) {
    console.log("User cannot access recording feature - redirecting to home");
    navigate('/');
    return null;
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    try {
      await handleTextSubmit(text, type);
      setShowTextInput(false);
    } catch (error) {
      console.error('Error handling text submit:', error);
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
          <UpgradeModal
            feature="recording"
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            onContinue={() => {
              setShowUpgradeModal(false);
              setShowSessionTypeModal(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RecordingContainer;