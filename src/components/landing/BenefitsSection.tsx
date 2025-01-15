import React from "react";
import { NotebookPen, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Smart Golf Journal",
    description: "Voice or text, capture your golf thoughts naturally. Use it on the drive home, after practice, or whenever inspiration hits.",
    icon: NotebookPen,
  },
  {
    title: "Deep Game Insights",
    description: "Let smart analysis uncover your patterns. From swing thoughts to pre-shot routines, see what actually works for YOUR game.",
    icon: Brain,
  },
  {
    title: "Your Golf Evolution",
    description: "Watch your game transform as insights build. Every breakthrough saved, every pattern spotted, every improvement tracked.",
    icon: TrendingUp,
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
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/90 p-8",
      "backdrop-blur-sm border border-zinc-800/30",
      "shadow-lg hover:shadow-xl",
      "transition-all duration-300 ease-in-out",
      "hover:translate-y-[-4px]",
      className
    )}
  >
    <div>
      <Icon className="h-12 w-12 mb-6 text-zinc-300 transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-2xl font-medium text-zinc-100 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-base leading-7 text-zinc-400 font-light max-w-[280px]">
        {description}
      </p>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-zinc-900">
            <span className="font-semibold">Core</span> Features
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

export default BenefitsSection;