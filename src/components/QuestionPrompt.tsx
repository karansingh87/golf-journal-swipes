import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-md mx-auto"
        setApi={(api) => {
          api?.on("select", () => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrentIndex(selectedIndex);
          });
        }}
      >
        <CarouselContent>
          {prompts.map((prompt, index) => (
            <CarouselItem key={index}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rounded-2xl bg-white px-6 py-4 shadow-card-light">
                    <div className="mb-1">
                      <span className="text-xs text-emerald-600/70">
                        Thought Starter {index + 1}/{prompts.length}
                      </span>
                    </div>
                    <p className="text-lg font-normal text-gray-600">
                      {prompt}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-2" />
        <CarouselNext className="hidden sm:flex -right-2" />
      </Carousel>
    </div>
  );
};

export default QuestionPrompt;