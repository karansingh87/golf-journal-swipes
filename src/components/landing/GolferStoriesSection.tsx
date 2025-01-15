import React from "react";
import { Car, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    icon: Car,
    content: "Record on your drive home and capture fresh insights during your post-round drive",
  },
  {
    icon: Target,
    content: "Type quick thoughts between practice sessions at the range to track your progress",
  },
  {
    icon: MessageSquare,
    content: "Choose between voice or text recording, right after play or when you're ready to reflect",
  },
];

const GolferStoriesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl mb-12">
          How <span className="font-semibold">Golfers Use It</span>
        </h2>
        
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-2">
          {stories.map((story, index) => (
            <div
              key={story.content}
              className={cn(
                "group relative flex overflow-hidden rounded-2xl bg-zinc-900/90 p-4",
                "border border-zinc-800/30",
                "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_4px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-[0_12px_24px_rgba(0,0,0,0.4),0_0_6px_rgba(0,0,0,0.3)]",
                "hover:translate-y-[-4px]"
              )}
            >
              <div className="flex items-center justify-between w-full gap-4">
                <p className={cn(
                  "text-zinc-400 text-lg leading-relaxed relative z-20",
                  index === 0 ? "font-semibold" : "font-normal"
                )}>
                  {story.content}
                </p>
                <story.icon className="h-10 w-10 flex-shrink-0 text-zinc-300 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;