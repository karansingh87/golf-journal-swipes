import React from "react";
import { Car, Target, Beer, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    title: "Talk through rounds on the drive home",
    icon: Car,
  },
  {
    title: "Quick notes during range sessions",
    icon: Target,
  },
  {
    title: "Capture thoughts at the 19th hole",
    icon: Beer,
  },
  {
    title: "Review rounds from home",
    icon: Home,
  },
];

const Feature = ({
  title,
  icon: Icon,
  index,
}: {
  title: string;
  icon: React.ElementType;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r border-zinc-200 py-10 relative group/feature min-h-[180px]",
        "bg-zinc-50",
        (index === 0 || index === 2) && "lg:border-l",
        index < 2 && "lg:border-b",
        index >= 2 && "lg:border-t lg:-mt-[1px]"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10 text-zinc-950">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <div className="text-sm relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-200 group-hover/feature:bg-zinc-950 transition-all duration-200 origin-center" />
        <span className="text-zinc-950">
          {title}
        </span>
      </div>
    </div>
  );
};

const GolferStoriesSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-20 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-zinc-50 border border-zinc-200">
            <span className="text-sm font-medium text-zinc-950">
              Journal Anytime
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 relative z-10">
          {stories.map((story, index) => (
            <Feature
              key={story.title}
              title={story.title}
              icon={story.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;