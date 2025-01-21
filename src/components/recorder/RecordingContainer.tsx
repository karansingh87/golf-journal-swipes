import { useState } from "react";
import VoiceRecorder from "../VoiceRecorder";
import TextInput from "../TextInput";
import { useGolfRecording } from "../../hooks/useGolfRecording";
import SessionTypeModal from "../SessionTypeModal";
import { UpgradeModal } from "../subscription/UpgradeModal";
import { useProfileData } from "./hooks/useProfileData";
import { useFeatureAccess } from "./hooks/useFeatureAccess";

const RecordingContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<"course" | "practice" | null>(null);
  const [showSessionTypeModal, setShowSessionTypeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { profile, isProfileLoading } = useProfileData();
  const { checkFeatureAccess, incrementFeatureUsage } = useFeatureAccess();
  
  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  const handleTextSubmitAndClose = async (text: string, type: "course" | "practice") => {
    if (!profile) return;

    const canUse = await checkFeatureAccess(profile);
    if (canUse) {
      await handleTextSubmit(text, type);
      await incrementFeatureUsage(profile);
      setShowTextInput(false);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleRecordingStart = async () => {
    if (!profile || isProfileLoading) return;

    const canUse = await checkFeatureAccess(profile);
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
    if (!profile || isProfileLoading) return;

    const canUse = await checkFeatureAccess(profile);
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

export default RecordingContainer;