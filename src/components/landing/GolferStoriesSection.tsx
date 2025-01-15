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
          {stories.map((story) => (
            <div
              key={story.content}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/90 p-4",
                "border border-zinc-800/30",
                "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_4px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-[0_12px_24px_rgba(0,0,0,0.4),0_0_6px_rgba(0,0,0,0.3)]",
                "hover:translate-y-[-4px]"
              )}
            >
              <div className="min-h-[100px]">
                <p className="text-zinc-400 text-base font-normal relative z-20">
                  {story.content}
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <story.icon className="h-8 w-8 text-zinc-300 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;