import React from "react";
import { Car, Target, MessageSquare } from "lucide-react";
import { Grid } from "@/components/ui/grid-pattern";

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
              className="relative bg-gradient-to-b from-neutral-100 to-white p-8 rounded-3xl overflow-hidden"
            >
              <story.icon className="h-8 w-8 mb-6 text-zinc-900 relative z-20" />
              <p className="text-base font-bold text-neutral-800 relative z-20 mb-4">
                {story.title}
              </p>
              <p className="text-neutral-600 text-base font-normal relative z-20 mb-6">
                {story.content}
              </p>
              <div className="text-sm text-zinc-500 relative z-20">
                {story.author}, {story.handicap} handicap
              </div>
              <Grid size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;