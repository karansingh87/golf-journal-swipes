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
    <div className="flex flex-col items-center justify-between min-h-[100dvh] relative pb-safe">
      <TranscriptionDisplay 
        transcription={transcription}
        isTranscribing={isTranscribing}
      />

      <div className="absolute top-1/4 left-0 right-0">
        <div className="w-full px-4">
          {sessionType && (
            <div className="card-container">
              {/* Card content will be rendered here */}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
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

      <div className="w-full px-6 pb-8">
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