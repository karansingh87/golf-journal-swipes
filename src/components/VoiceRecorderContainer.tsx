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
    await handleTextSubmit(text);
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0a1f0a] text-white px-4">
      {showTextInput ? (
        <TextInput
          onSubmit={handleTextSubmitAndClose}
          onCancel={() => setShowTextInput(false)}
          isProcessing={isProcessingText}
        />
      ) : (
        <>
          <SessionTypeModal 
            isOpen={showSessionModal} 
            onSelect={handleSessionSelect} 
          />
          {sessionType && <CardDeck type={sessionType} />}
          <VoiceRecorder
            isTranscribing={isTranscribing}
            transcription={transcription}
            onRecordingComplete={handleAudioRecording}
            onSwitchToText={() => setShowTextInput(true)}
            onRecordingStart={handleRecordingStart}
            sessionType={sessionType}
          />
        </>
      )}
    </div>
  );
};

export default VoiceRecorderContainer;