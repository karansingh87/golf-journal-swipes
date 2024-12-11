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
    <div className="flex flex-col items-center justify-between flex-1 gap-4 py-6">
      <TranscriptionDisplay 
        transcription={transcription}
        isTranscribing={isTranscribing}
      />

      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        <RecordingTimer recordingTime={recordingTime} />
      </div>

      <div className="w-full max-w-xs mx-auto flex items-center justify-center mb-4">
        <Button
          variant="ghost"
          onClick={onSwitchToText}
          className="flex items-center gap-2 text-green-400/60 hover:text-green-400/80"
        >
          <Keyboard className="w-4 h-4" />
          <span className="text-sm">Use Keyboard</span>
        </Button>
      </div>

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
  );
};

export default VoiceRecorder;