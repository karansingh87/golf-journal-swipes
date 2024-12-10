import { useRecorder } from "../hooks/useRecorder";
import AudioWaveform from "./AudioWaveform";
import RecordingTimer from "./RecordingTimer";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import { Button } from "@/components/ui/button";

interface VoiceRecorderProps {
  isTranscribing: boolean;
  transcription: string;
  onRecordingComplete: (audioBlob: Blob, recordingTime: number) => void;
  onSwitchToText: () => void;
}

const VoiceRecorder = ({
  isTranscribing,
  transcription,
  onRecordingComplete,
  onSwitchToText,
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
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <AudioWaveform isRecording={isRecording && !isPaused} mediaStream={mediaStream} />
          <RecordingTimer recordingTime={recordingTime} />
        </div>

        <TranscriptionDisplay 
          transcription={transcription}
          isTranscribing={isTranscribing}
        />

        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          onStart={startRecording}
          onPause={pauseRecording}
          onResume={resumeRecording}
          onStop={handleStopRecording}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default VoiceRecorder;