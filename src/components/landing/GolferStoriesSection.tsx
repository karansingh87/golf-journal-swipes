import React from "react";
import { NotebookPen, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    stat: "24/7",
    title: "Record Anywhere",
    content: "Record during the drive home and capture fresh insights from post-round drive",
    icon: NotebookPen,
  },
  {
    stat: "Quick",
    title: "Practice Notes",
    content: "Type quick thoughts between practice sessions at the range to track progress",
    icon: Target,
  },
  {
    stat: "Easy",
    title: "Voice or Text",
    content: "Choose between voice or text recording, right after play or when ready to reflect",
    icon: MessageSquare,
  },
];

const GolferStoriesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
          {stories.map((story) => (
            <div
              key={story.content}
              className="group relative flex flex-col"
            >
              <div className="mb-4">
                <span className="text-5xl font-semibold text-zinc-100">
                  {story.stat}
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold text-zinc-100 mb-3">
                {story.title}
              </h3>
              
              <p className="text-zinc-400 text-lg leading-relaxed">
                {story.content}
              </p>
              
              <story.icon className="h-8 w-8 text-zinc-500 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;