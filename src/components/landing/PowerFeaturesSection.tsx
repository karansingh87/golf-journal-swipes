import React from "react";
import { LineChart, Brain, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Trend Spotting",
    description: "See patterns across multiple rounds. Smart analysis connects the dots between your best performances.",
    icon: LineChart,
  },
  {
    title: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Brain,
  },
  {
    title: "Better Lessons",
    description: "Share structured insights with your coach. Transform random thoughts into focused improvement plans.",
    icon: Share2,
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      "group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-zinc-800 p-8",
      "shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_6px_rgba(0,0,0,0.03)]",
      "transform-gpu transition-transform duration-300 hover:scale-[1.02]",
      className
    )}
  >
    <Icon className="h-12 w-12 mb-3 text-zinc-300" />
    <h3 className="text-xl font-semibold text-zinc-100 mb-3">
      {title}
    </h3>
    <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">{description}</p>
  </div>
);

const PowerFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-normal text-zinc-100 max-w-2xl">
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