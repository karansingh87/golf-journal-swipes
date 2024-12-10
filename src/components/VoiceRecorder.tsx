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

        <div className="w-full max-w-2xl mx-auto mb-8 flex justify-center">
          <Button
            variant="outline"
            onClick={onSwitchToText}
            className="text-golf-green hover:text-golf-green/90"
          >
            Or type your note instead
          </Button>
        </div>

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