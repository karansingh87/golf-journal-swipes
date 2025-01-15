import React from "react";
import { Blend, Flame, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Trend Spotting",
    description: "See patterns across multiple rounds. Smart analysis connects the dots between your best performances.",
    icon: Blend,
  },
  {
    title: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Flame,
  },
  {
    title: "Better Lessons",
    description: "Share structured insights with your coach. Transform random thoughts into focused improvement plans.",
    icon: MessagesSquare,
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  description,
  Icon,
  className,
}: {
  title: string;
  description: string;
  Icon: any;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/90 p-8",
      "backdrop-blur-sm border border-zinc-200",
      "shadow-lg hover:shadow-xl",
      "transition-all duration-300 ease-in-out",
      "hover:translate-y-[-4px]",
      className
    )}
  >
    <div>
      <Icon className="h-12 w-12 mb-6 text-zinc-900 transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-2xl font-medium text-zinc-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-base leading-7 text-zinc-600 font-light max-w-[280px]">
        {description}
      </p>
    </div>
  </div>
);

const PowerFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Power <span className="font-semibold">Features</span>
          </h2>
        </div>
        
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default PowerFeaturesSection;