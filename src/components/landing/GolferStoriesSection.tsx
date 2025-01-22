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
        "flex flex-col py-10 relative group/feature min-h-[180px]",
        "bg-[#F2FCE2] border-[#2F3E46]/10",
        // Consistent border rules for all sides
        "lg:border-r lg:border-b",
        // First column needs left border
        index % 2 === 0 && "lg:border-l",
        // Last row needs different bottom border treatment
        index >= 2 && "lg:border-b"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#F2FCE2] to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10 text-[#2F3E46]">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <div className="text-sm relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#2F3E46]/20 group-hover/feature:bg-[#2F3E46] transition-all duration-200 origin-center" />
        <span className="text-[#2F3E46]">
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
          <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-zinc-900">
            <span className="text-sm font-medium text-zinc-50">
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