import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "../VoiceRecorder";
import TextInput from "../TextInput";
import { useGolfRecording } from "../../hooks/useGolfRecording";
import SessionTypeModal from "../SessionTypeModal";
import { UpgradeModal } from "../subscription/UpgradeModal";
import { useProfileData } from "./hooks/useProfileData";
import { useFeatureAccess } from "./hooks/useFeatureAccess";

const RecordingContainer = () => {
  const navigate = useNavigate();
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { profile, isProfileLoading, isAuthenticated } = useProfileData();
  const { checkFeatureAccess, incrementFeatureUsage } = useFeatureAccess();
  
  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    if (!profile) return;

    const canUse = await checkFeatureAccess(profile);
    if (canUse || profile.has_pro_access) {
      await handleTextSubmit(text, type);
      if (!profile.has_pro_access) {
        await incrementFeatureUsage(profile);
      }
      setShowTextInput(false);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleRecordingStart = async () => {
    if (!profile || isProfileLoading) return;

    const canUse = await checkFeatureAccess(profile);
    if (canUse || profile.has_pro_access) {
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
    if (!profile || isProfileLoading) return;

    const canUse = await checkFeatureAccess(profile);
    if (canUse || profile.has_pro_access) {
      setShowTextInput(true);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleContinue = () => {
    setShowUpgradeModal(false);
    setShowSessionTypeModal(true);
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
            onContinue={handleContinue}
          />
        </div>
      )}
    </div>
  );
};

export default RecordingContainer;