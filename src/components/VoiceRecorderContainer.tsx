import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";

const VoiceRecorderContainer = () => {
  const [showTextInput, setShowTextInput] = useState(false);
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0a1f0a] text-white px-4">
      {showTextInput ? (
        <TextInput
          onSubmit={handleTextSubmitAndClose}
          onCancel={() => setShowTextInput(false)}
          isProcessing={isProcessingText}
        />
      ) : (
        <VoiceRecorder
          isTranscribing={isTranscribing}
          transcription={transcription}
          onRecordingComplete={handleAudioRecording}
          onSwitchToText={() => setShowTextInput(true)}
        />
      )}
    </div>
  );
};

export default VoiceRecorderContainer;