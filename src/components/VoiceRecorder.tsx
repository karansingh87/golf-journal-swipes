import { useRecorder } from "../hooks/useRecorder";
import { Keyboard } from "lucide-react";
import RecordingTimer from "./RecordingTimer";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface VoiceRecorderProps {
  isTranscribing: boolean;
  transcription: string;
  onRecordingComplete: (audioBlob: Blob, recordingTime: number) => void;
  onSwitchToText: () => void;
  onRecordingStart: () => void;
  sessionType: "course" | "practice" | null;
  autoStartRecording?: boolean;
}

const VoiceRecorder = ({
  isTranscribing,
  transcription,
  onRecordingComplete,
  onSwitchToText,
  onRecordingStart,
  sessionType,
  autoStartRecording = false,
}: VoiceRecorderProps) => {
  const {
    isRecording,
    isPaused,
    mediaStream,
    audioChunks,
    recordingTime,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  useEffect(() => {
    if (sessionType && autoStartRecording && !isRecording) {
      startRecording();
    }
  }, [sessionType, autoStartRecording, startRecording, isRecording]);

  const handleStartRecording = () => {
    if (!sessionType) {
      onRecordingStart();
    } else {
      startRecording();
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      onRecordingComplete(audioBlob, recordingTime);
    }
  };

  const handleCancel = () => {
    stopRecording();
    resetRecording();
  };

  return (
    <div className="relative flex flex-col items-center justify-between h-[100dvh] overflow-hidden">
      <TranscriptionDisplay 
        transcription={transcription}
        isTranscribing={isTranscribing}
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0 px-4">
        <RecordingTimer recordingTime={recordingTime} />
        
        <Button
          variant="ghost"
          onClick={onSwitchToText}
          className="flex items-center gap-2 text-green-400/70 hover:text-green-400/90 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
          <span className="text-sm">Use Keyboard</span>
        </Button>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-6 pb-8 pt-4">
        {isRecording && (
          <button
            onClick={handleStopRecording}
            className="relative z-20 min-h-[44px] px-6 py-2 rounded-full bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 text-green-400 flex items-center justify-center gap-2 transition-all duration-200"
          >
            <span className="text-sm">Finish</span>
          </button>
        )}
        
        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          onStart={handleStartRecording}
          onPause={pauseRecording}
          onResume={resumeRecording}
          onStop={handleStopRecording}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default VoiceRecorder;