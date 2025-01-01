import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionPromptProps {
  prompts: string[];
  isPaused: boolean;
}

const QuestionPrompt = ({ prompts, isPaused }: QuestionPromptProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const PROMPT_DURATION = 7000; // 7 seconds

  useEffect(() => {
    if (isPaused || prompts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prompts.length);
    }, PROMPT_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, prompts.length]);

  if (prompts.length === 0) return null;

  return (
    <div className="absolute top-[20%] left-0 right-0 px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div 
            className="rounded-2xl bg-white px-8 py-6 shadow-lg"
          >
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">
                Thought Starter
              </span>
            </div>
            
            <p className="text-3xl font-semibold text-gray-900">
              {prompts[currentIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionPrompt;