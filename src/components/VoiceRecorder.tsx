import { useRecorder } from "../hooks/useRecorder";
import RecordingTimer from "./recorder/RecordingTimer";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import KeyboardToggle from "./recorder/KeyboardToggle";
import FinishButton from "./recorder/FinishButton";
import { useEffect } from "react";

interface VoiceRecorderProps {
  isTranscribing: boolean;
  transcription: string;
  onRecordingComplete: (audioBlob: Blob, recordingTime: number, sessionType: 'course' | 'practice') => void;
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
    if (!sessionType) {
      console.error("Session type not set");
      return;
    }
    
    stopRecording();
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      onRecordingComplete(audioBlob, recordingTime, sessionType);
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
        <KeyboardToggle onSwitchToText={onSwitchToText} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-6 pb-8 pt-4">
        {isRecording && (
          <FinishButton onClick={handleStopRecording} />
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