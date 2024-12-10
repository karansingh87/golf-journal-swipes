import { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import TextInput from "./TextInput";
import { useGolfRecording } from "../hooks/useGolfRecording";
import { Keyboard } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0a1f0a] text-white px-4 flex flex-col items-center justify-between py-6 sm:py-12">
      <div className="w-full max-w-md text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
          What Can I Do for You Today?
        </h1>
        
        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-sm mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-100" />
          <div className="absolute inset-0 bg-green-300/5 rounded-full blur-xl animate-pulse delay-200" />
        </div>
      </div>

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

      <div className="w-full max-w-xs mx-auto flex items-center justify-center space-x-2 text-green-400/60">
        <Keyboard className="w-4 h-4" />
        <span className="text-sm">Use Keyboard</span>
      </div>
    </div>
  );
};

export default VoiceRecorderContainer;