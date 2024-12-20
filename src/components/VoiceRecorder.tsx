import { useRecorder } from "../hooks/useRecorder";
import RecordingTimer from "./recorder/RecordingTimer";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import KeyboardToggle from "./recorder/KeyboardToggle";
import QuestionPrompt from "./QuestionPrompt";
import { useEffect } from "react";

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

  return (
    <div className="relative flex flex-col items-center justify-between h-[100dvh] overflow-hidden">
      <TranscriptionDisplay 
        transcription={transcription}
        isTranscribing={isTranscribing}
      />

      {sessionType && (
        <div className="w-full mb-24">
          <QuestionPrompt 
            prompts={prompts}
            isPaused={isPaused}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center gap-8 min-h-0 px-4 mb-8">
        <RecordingTimer recordingTime={recordingTime} />
        <KeyboardToggle onSwitchToText={onSwitchToText} />
      </div>

      <RecordingControls
        isRecording={isRecording}
        isPaused={isPaused}
        onStart={handleStartRecording}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={handleStopRecording}
      />
    </div>
  );
};

export default VoiceRecorder;
