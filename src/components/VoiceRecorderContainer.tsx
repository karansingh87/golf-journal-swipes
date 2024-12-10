import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import NavigationButtons from "./NavigationButtons";
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
    <div className="min-h-screen bg-white px-4 pt-12 pb-6">
      <NavigationButtons />

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