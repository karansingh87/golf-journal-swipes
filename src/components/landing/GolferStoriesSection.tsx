import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  emoji: string;
  title: string;
  content: string;
  author: string;
  handicap: number;
  gradient: string;
}

const stories: Story[] = [
  {
    emoji: "🚗",
    title: "The Drive Home Review",
    content: "Perfect time for voice notes. I use my 15-minute drive to capture what clicked today before the feeling fades. No pressure, just talking through my round.",
    author: "Mike",
    handicap: 15,
    gradient: "from-purple-50 to-indigo-100 border-indigo-200"
  },
  {
    emoji: "📱",
    title: "Range Session Insights",
    content: "Quick text notes after practice. Found a new feeling with my driver? Type it in. Working on a swing change? Save what works. Takes seconds.",
    author: "Sarah",
    handicap: 8,
    gradient: "from-amber-50 to-orange-100 border-orange-200"
  },
  {
    emoji: "🎯",
    title: "Post-Round Notes",
    content: "Sometimes I'll wait until I'm alone to record my thoughts. Other times I'll type quick notes right after a putt drops. GolfLog fits how I want to use it.",
    author: "Tom",
    handicap: 12,
    gradient: "from-emerald-50 to-teal-100 border-teal-200"
  },
];

const GolferStoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isUpSwipe && currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl mb-12">
          How <span className="font-semibold">Golfers Use It</span>
        </h2>
        
        <div 
          className="relative h-[400px] md:h-[500px] touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Progress indicators */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
            {stories.map((_, index) => (
              <CircleDot 
                key={index}
                className={cn(
                  "w-4 h-4 transition-colors duration-300",
                  index === currentIndex ? "text-zinc-900" : "text-zinc-300"
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className={cn(
              "absolute left-1/2 top-4 -translate-x-1/2 p-2 rounded-full",
              "bg-white/10 hover:bg-white/20 transition-colors z-20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              currentIndex === 0 && "opacity-0 pointer-events-none"
            )}
            disabled={currentIndex === 0}
            aria-label="Previous story"
          >
            <ChevronUp className="w-6 h-6 text-zinc-900" />
          </button>
          
          <button
            onClick={handleNext}
            className={cn(
              "absolute left-1/2 bottom-4 -translate-x-1/2 p-2 rounded-full",
              "bg-white/10 hover:bg-white/20 transition-colors z-20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              currentIndex === stories.length - 1 && "opacity-0 pointer-events-none"
            )}
            disabled={currentIndex === stories.length - 1}
            aria-label="Next story"
          >
            <ChevronDown className="w-6 h-6 text-zinc-900" />
          </button>

          {/* Story cards */}
          <div className="relative w-full h-full">
            {stories.map((story, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 w-full h-full rounded-2xl p-8",
                  "flex flex-col justify-center items-center text-center",
                  "transition-all duration-500 ease-in-out",
                  "bg-gradient-to-br border",
                  story.gradient,
                  index === currentIndex 
                    ? "opacity-100 transform-none" 
                    : index < currentIndex
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
                )}
              >
                <div className="text-6xl mb-6 animate-bounce">{story.emoji}</div>
                <h3 className="text-2xl font-semibold mb-4 text-zinc-900">
                  {story.title}
                </h3>
                <p className="text-lg mb-8 max-w-2xl text-zinc-700">
                  {story.content}
                </p>
                <div className="text-sm text-zinc-600">
                  {story.author}, {story.handicap} handicap
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;