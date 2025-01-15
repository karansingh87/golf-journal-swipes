import React from "react";
import { MessageSquare, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Smart Golf Journal",
    description: "Voice or text, capture your golf thoughts naturally. Use it on the drive home, after practice, or whenever inspiration hits.",
    icon: MessageSquare,
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
    <div className="grid w-full auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/80 p-8",
      "backdrop-blur-sm border border-white/20",
      "shadow-[0_8px_16px_rgba(0,0,0,0.08),0_0_4px_rgba(0,0,0,0.05)]",
      "transition-all duration-300 ease-in-out",
      "hover:shadow-[0_12px_24px_rgba(0,0,0,0.12),0_0_6px_rgba(0,0,0,0.08)]",
      "hover:translate-y-[-4px] hover:bg-white/90",
      className
    )}
  >
    <div>
      <Icon className="h-12 w-12 mb-6 text-zinc-800 transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-2xl font-semibold text-zinc-800 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-600 text-sm leading-relaxed font-light max-w-[280px]">{description}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl">
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