import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import SessionTypeModal from "./SessionTypeModal";
import CardDeck from "./CardDeck";
import { useGolfRecording } from "../hooks/useGolfRecording";

type SessionType = "course" | "practice" | null;

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  
  const {
    isTranscribing,
    isProcessingText,
    transcription,
    handleAudioRecording,
    handleTextSubmit,
  } = useGolfRecording();

  const handleTextSubmitAndClose = async (text: string) => {
    if (!sessionType) {
      console.error("Session type not set");
      return;
    }
    await handleTextSubmit(text, sessionType);
    setShowTextInput(false);
  };

  const handleRecordingStart = () => {
    setShowSessionModal(true);
  };

  const handleSessionSelect = (type: "course" | "practice") => {
    setSessionType(type);
    setShowSessionModal(false);
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
          <SessionTypeModal 
            isOpen={showSessionModal} 
            onSelect={handleSessionSelect}
            onClose={() => setShowSessionModal(false)}
          />
          
          {sessionType && (
            <div className="absolute top-[20%] left-0 right-0 max-h-[20vh]">
              <CardDeck type={sessionType} />
            </div>
          )}
          
          <VoiceRecorder
            isTranscribing={isTranscribing}
            transcription={transcription}
            onRecordingComplete={handleAudioRecording}
            onSwitchToText={() => setShowTextInput(true)}
            onRecordingStart={handleRecordingStart}
            sessionType={sessionType}
            autoStartRecording={true}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;