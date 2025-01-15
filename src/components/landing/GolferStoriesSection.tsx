import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Car, Target } from "lucide-react";

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
    title: "The Drive Home Review",
    content: "Perfect time for voice notes. I use my 15-minute drive to capture what clicked today before the feeling fades. No pressure, just talking through my round.",
    author: "Mike",
    handicap: 15,
  },
  {
    icon: Target,
    title: "Range Session Insights",
    content: "Quick text notes after practice. Found a new feeling with my driver? Type it in. Working on a swing change? Save what works. Takes seconds.",
    author: "Sarah",
    handicap: 8,
  },
  {
    icon: MessageSquare,
    title: "Post-Round Notes",
    content: "Sometimes I'll wait until I'm alone to record my thoughts. Other times I'll type quick notes right after a putt drops. GolfLog fits how I want to use it.",
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
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8",
      "border border-zinc-200/30",
      "shadow-card-light",
      "transition-all duration-300 ease-in-out",
      "hover:shadow-lg hover:translate-y-[-4px]",
      className
    )}
  >
    <div>
      <Icon className="h-12 w-12 mb-6 text-zinc-700 transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-2xl font-semibold text-zinc-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-600 text-sm leading-relaxed font-light max-w-[280px] mb-6">{content}</p>
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