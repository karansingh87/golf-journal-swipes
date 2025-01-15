import React from "react";
import { cn } from "@/lib/utils";
import { Car, Target, MessageSquare } from "lucide-react";

interface Story {
  icon: any;
  title: string;
  content: string;
  author: string;
  handicap: number;
}

const stories: Story[] = [
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

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  content,
  Icon,
  author,
  handicap,
  className,
}: {
  title: string;
  content: string;
  Icon: any;
  author: string;
  handicap: number;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative flex flex-col overflow-hidden rounded-xl bg-white p-8",
      "border border-zinc-200",
      "shadow-sm",
      className
    )}
  >
    <div className="relative z-10 flex flex-col h-full">
      <Icon className="h-8 w-8 mb-6 text-zinc-900" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-zinc-900 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-zinc-600 text-base leading-relaxed mb-6">
          {content}
        </p>
      </div>
      <div className="text-sm text-zinc-500">
        {author}, {handicap} handicap
      </div>
    </div>
  </div>
);

const GolferStoriesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl mb-12">
          How <span className="font-semibold">Golfers Use It</span>
        </h2>
        
        <BentoGrid>
          {stories.map((story) => (
            <BentoCard
              key={story.title}
              title={story.title}
              content={story.content}
              Icon={story.icon}
              author={story.author}
              handicap={story.handicap}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default GolferStoriesSection;