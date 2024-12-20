import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionPromptProps {
  prompts: string[];
  isPaused: boolean;
}

const QuestionPrompt = ({ prompts, isPaused }: QuestionPromptProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const PROMPT_DURATION = 15000; // 15 seconds

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
          className="w-full max-w-2xl mx-auto"
        >
          <div 
            className="relative rounded-2xl bg-zinc-900/40 p-3"
          >
            <div className="mb-1 flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold bg-gradient-to-r from-[#98EC65] to-[#5BED9E] bg-clip-text text-transparent opacity-60">
                  Thought Starter
                </span>
              </div>
            </div>
            
            <p className="text-lg font-normal leading-relaxed tracking-tight text-white/60">
              {prompts[currentIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionPrompt;