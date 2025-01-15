import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  emoji: string;
  title: string;
  content: string;
  author: string;
  handicap: number;
}

const stories: Story[] = [
  {
    emoji: "🚗",
    title: "The Drive Home Review",
    content: "Perfect time for voice notes. I use my 15-minute drive to capture what clicked today before the feeling fades. No pressure, just talking through my round.",
    author: "Mike",
    handicap: 15,
  },
  {
    emoji: "📱",
    title: "Range Session Insights",
    content: "Quick text notes after practice. Found a new feeling with my driver? Type it in. Working on a swing change? Save what works. Takes seconds.",
    author: "Sarah",
    handicap: 8,
  },
  {
    emoji: "🎯",
    title: "Post-Round Notes",
    content: "Sometimes I'll wait until I'm alone to record my thoughts. Other times I'll type quick notes right after a putt drops. GolfLog fits how I want to use it.",
    author: "Tom",
    handicap: 12,
  },
];

const GolferStoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
      }, 5000); // Change story every 5 seconds

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPaused]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl mb-12">
          How <span className="font-semibold">Golfers Use It</span>
        </h2>
        
        <div 
          className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-zinc-900 shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
            {stories.map((_, index) => (
              <div 
                key={index} 
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
              >
                <div 
                  className={`h-full bg-white transition-all duration-[5000ms] ease-linear ${
                    index === currentIndex ? "w-full" : index < currentIndex ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Story content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
            <div className="text-6xl mb-6 animate-bounce">{stories[currentIndex].emoji}</div>
            <h3 className="text-2xl font-semibold mb-4 animate-fade-in">
              {stories[currentIndex].title}
            </h3>
            <p className="text-lg mb-8 max-w-2xl animate-fade-in">
              {stories[currentIndex].content}
            </p>
            <div className="text-sm text-white/80 animate-fade-in">
              {stories[currentIndex].author}, {stories[currentIndex].handicap} handicap
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;