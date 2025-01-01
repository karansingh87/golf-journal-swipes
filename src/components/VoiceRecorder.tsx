import { useRecorder } from "../hooks/useRecorder";
import RecordingTimer from "./recorder/RecordingTimer";
import RecordingControls from "./RecordingControls";
import QuestionPrompt from "./QuestionPrompt";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const COURSE_PROMPTS = [
  "Walk me through your round.",
  "What moments are staying with you?",
  "How did your game feel?",
  "What did you discover?",
  "Tell me about your scoring.",
  "Which shots are you thinking about?",
  "What decisions stand out?",
  "Share your strengths and challenges.",
  "What made this round different?",
  "What's worth remembering?"
];

const PRACTICE_PROMPTS = [
  "What clicked during practice?",
  "Walk me through what was working.",
  "Tell me about the good and challenging moments.",
  "What discoveries did you make?",
  "What moments stand out?",
  "What feels different?",
  "Tell me your practice story.",
  "What did you figure out?",
  "Share your highs and lows.",
  "What did you learn?"
];

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

  const prompts = sessionType === 'course' ? COURSE_PROMPTS : PRACTICE_PROMPTS;

  if (isTranscribing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-[2px] z-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-golf-green" />
          <p className="text-golf-green/80 text-sm font-medium">
            Processing your recording...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center h-[100dvh] overflow-hidden">
      {sessionType ? (
        <>
          <div className="w-full mt-8 mb-auto">
            <QuestionPrompt 
              prompts={prompts}
              isPaused={isPaused}
            />
          </div>
          <div className="flex flex-col items-center justify-center mb-48">
            <RecordingTimer recordingTime={recordingTime} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center mb-32">
          <RecordingTimer recordingTime={recordingTime} />
        </div>
      )}

      <RecordingControls
        isRecording={isRecording}
        isPaused={isPaused}
        onStart={handleStartRecording}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={handleStopRecording}
        onSwitchToText={onSwitchToText}
      />
    </div>
  );
};

export default VoiceRecorder;
