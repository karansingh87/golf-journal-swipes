import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Car, Target, Dumbbell } from "lucide-react";

interface Story {
  emoji: string;
  icon: any;
  title: string;
  content: string;
  author: string;
  handicap: number;
}

const stories: Story[] = [
  {
    emoji: "🚗",
    icon: Car,
    title: "The Drive Home Review",
    content: "Perfect time for voice notes. I use my 15-minute drive to capture what clicked today before the feeling fades. No pressure, just talking through my round.",
    author: "Mike",
    handicap: 15,
  },
  {
    emoji: "📱",
    icon: Dumbbell,
    title: "Range Session Insights",
    content: "Quick text notes after practice. Found a new feeling with my driver? Type it in. Working on a swing change? Save what works. Takes seconds.",
    author: "Sarah",
    handicap: 8,
  },
  {
    emoji: "🎯",
    icon: Target,
    title: "Post-Round Notes",
    content: "Sometimes I'll wait until I'm alone to record my thoughts. Other times I'll type quick notes right after a putt drops. GolfLog fits how I want to use it.",
    author: "Tom",
    handicap: 12,
  },
];

const GolferStoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl mb-12">
          How <span className="font-semibold">Golfers Use It</span>
        </h2>
        
        <div className="relative min-h-[500px] touch-pan-y">
          {stories.map((story, index) => {
            const isActive = index === activeIndex;
            const Icon = story.icon;
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute right-0 w-full transition-all duration-500 ease-in-out",
                  "cursor-pointer select-none",
                  isActive ? "z-20" : "z-10",
                  index < activeIndex ? "-translate-y-full opacity-0" : "",
                  index > activeIndex ? "translate-y-full opacity-0" : ""
                )}
                style={{
                  transform: `translateY(${(index - activeIndex) * 100}%)`,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div 
                  className={cn(
                    "relative flex items-start",
                    "transition-all duration-500 ease-in-out",
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
                  )}
                >
                  {/* Tab/Bookmark part */}
                  <div 
                    className={cn(
                      "absolute right-0 flex items-center gap-3 px-6 py-4 rounded-l-xl",
                      "transition-all duration-300",
                      isActive 
                        ? "bg-zinc-100 text-zinc-900 shadow-lg" 
                        : "bg-zinc-200/80 text-zinc-600 hover:bg-zinc-200",
                      "w-24 md:w-32"
                    )}
                    style={{
                      transform: `translateX(${isActive ? '0' : '70%'})`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content part */}
                  <div 
                    className={cn(
                      "w-full bg-zinc-100 rounded-xl p-8 pr-32",
                      "transform transition-all duration-500",
                      "shadow-lg border border-zinc-200",
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;