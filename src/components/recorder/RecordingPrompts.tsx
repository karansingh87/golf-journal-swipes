import QuestionPrompt from "../QuestionPrompt";

interface RecordingPromptsProps {
  sessionType: "course" | "practice" | null;
  isPaused: boolean;
}

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

const RecordingPrompts = ({ sessionType, isPaused }: RecordingPromptsProps) => {
  if (!sessionType) return null;

  const prompts = sessionType === 'course' ? COURSE_PROMPTS : PRACTICE_PROMPTS;

  return (
    <div className="w-full mt-8 mb-auto">
      <QuestionPrompt 
        prompts={prompts}
        isPaused={isPaused}
      />
    </div>
  );
};

export default RecordingPrompts;