import { useRecorder } from "../hooks/useRecorder";
import RecordingTimer from "./recorder/RecordingTimer";
import RecordingControls from "./RecordingControls";
import TranscriptionDisplay from "./TranscriptionDisplay";
import KeyboardToggle from "./recorder/KeyboardToggle";
import QuestionPrompt from "./QuestionPrompt";
import { useEffect } from "react";

const COURSE_PROMPTS = [
  "How'd it go out there - what's the full story?",
  "Talk me through your day - best shots and key moments?",
  "What parts of today's round are still on your mind?",
  "How'd your game feel - what was working?",
  "Walk me through what you discovered today.",
  "Tell me about your scoring today - what made the difference?",
  "What decisions or shots are you still thinking about?",
  "How'd your game show up today - strengths and challenges?",
  "What separated this round from others?",
  "What's worth remembering from today's round?"
];

const PRACTICE_PROMPTS = [
  "What aspect are you working on?",
  "How's your form feeling?",
  "What's working well today?",
  "What adjustments are you making?",
  "Rate your progress (1-10)"
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
