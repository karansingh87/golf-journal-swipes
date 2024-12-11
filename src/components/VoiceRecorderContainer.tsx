import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import SessionTypeModal from "./SessionTypeModal";
import CardDeck from "./CardDeck";
import { useGolfRecording } from "../hooks/useGolfRecording";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="fixed inset-0 flex flex-col bg-background text-foreground transition-colors duration-300 overflow-hidden">
        <div className="absolute top-4 left-4">
          <ThemeToggle />
        </div>
        
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
    </ThemeProvider>
  );
};

export default VoiceRecorderContainer;