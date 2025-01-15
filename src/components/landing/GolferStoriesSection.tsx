import React from "react";
import { Car, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    icon: Car,
    title: "Record on your drive home",
    content: "Capture fresh insights during your post-round drive",
    author: "Mike",
    handicap: 15,
  },
  {
    icon: Target,
    title: "Quick notes at the range",
    content: "Type quick thoughts between practice sessions",
    author: "Sarah",
    handicap: 8,
  },
  {
    icon: MessageSquare,
    title: "Flexible recording options",
    content: "Voice or text, right after play or when you're ready",
    author: "Tom",
    handicap: 12,
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
              key={story.title}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/90 p-6",
                "border border-zinc-800/30",
                "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_4px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-[0_12px_24px_rgba(0,0,0,0.4),0_0_6px_rgba(0,0,0,0.3)]",
                "hover:translate-y-[-4px]"
              )}
            >
              <div className="min-h-[140px]">
                <p className="text-base font-bold text-zinc-100 mb-4">
                  {story.title}
                </p>
                <p className="text-zinc-400 text-base font-normal relative z-20 mb-6">
                  {story.content}
                </p>
                <div className="text-sm text-zinc-500 relative z-20">
                  {story.author}, {story.handicap} handicap
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
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