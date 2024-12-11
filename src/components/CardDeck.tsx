import { useState } from "react";
import SwipeableCard from "./SwipeableCard";

const COURSE_PROMPTS = [
  "What club did you use for this shot?",
  "How's your confidence level right now?",
  "What's your target and strategy?",
  "How's the wind affecting your shot?",
  "What's your score on this hole?",
];

const PRACTICE_PROMPTS = [
  "What aspect are you working on?",
  "How's your form feeling?",
  "What's working well today?",
  "What adjustments are you making?",
  "Rate your progress (1-10)",
];

interface CardDeckProps {
  type: "course" | "practice";
}

const CardDeck = ({ type }: CardDeckProps) => {
  const initialPrompts = type === "course" ? COURSE_PROMPTS : PRACTICE_PROMPTS;
  const [cards, setCards] = useState(initialPrompts);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setCards((prev) => prev.slice(1));
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-[85%] max-w-md mx-auto h-[120px] touch-manipulation">
        {cards.map((content, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 right-0 
                     ${index === 0 ? "z-20" : "z-10 -rotate-3"}`}
            style={{
              opacity: index === 0 ? 1 : index === 1 ? 0.5 : 0.2,
            }}
          >
            <SwipeableCard content={content} onSwipe={handleSwipe} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-1.5 mt-3">
        {Array.from({ length: initialPrompts.length }).map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-green-400 w-3"
                : "bg-green-400/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDeck;