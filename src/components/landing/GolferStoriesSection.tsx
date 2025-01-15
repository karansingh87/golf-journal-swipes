import React from "react";
import { NotebookPen, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    title: "Drive Back Home",
    content: "Record during the drive home and capture fresh insights from your round",
    icon: NotebookPen,
  },
  {
    title: "On The Range",
    content: "Type quick thoughts between practice sessions at the range to track progress",
    icon: Target,
  },
  {
    title: "Reflection Time",
    content: "Choose between voice or text recording, right after play or when ready to reflect",
    icon: MessageSquare,
  },
];

const GolferStoriesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-zinc-100 text-right mb-16">
          When Do Golfers Use It?
        </h2>
        
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
          {stories.map((story) => (
            <div
              key={story.content}
              className="group relative flex flex-col"
            >
              <div className="mb-6">
                <story.icon className="h-12 w-12 text-zinc-100" />
              </div>
              
              <h3 className="text-2xl font-semibold text-zinc-100 mb-3">
                {story.title}
              </h3>
              
              <p className="text-zinc-400 text-lg leading-relaxed">
                {story.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;