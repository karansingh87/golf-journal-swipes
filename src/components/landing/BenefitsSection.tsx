import React from "react";
import { MessageSquare, Brain, PieChart, Users, TrendingUp, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Capture On Your Terms",
    description: "Record your thoughts your way - voice notes on the drive home, quick text after a range session, or whenever it feels right.",
    icon: MessageSquare,
  },
  {
    title: "Personal Patterns",
    description: "Discover your unique performance triggers. From practice drills to pre-shot routines, see what really improves your scores.",
    icon: PieChart,
  },
  {
    title: "Beyond the Numbers",
    description: "While others track just scores and stats, GolfLog captures the complete story of your golf journey.",
    icon: Brain,
  },
  {
    title: "Your Golf Time Machine",
    description: "Go back to any breakthrough moment. That perfect drive or game-changing range session? Every insight saved and searchable.",
    icon: Timer,
  },
  {
    title: "Coach-Ready Insights",
    description: "Share focused insights with your coach. No more \"What were we working on last time?\" Transform your practice and play.",
    icon: Users,
  },
  {
    title: "Practice to Performance",
    description: "Connect your range breakthroughs to course success. See which practice methods deliver real results for your game.",
    icon: TrendingUp,
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
      "group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-white p-8",
      "shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_6px_rgba(0,0,0,0.03)]",
      "transform-gpu transition-transform duration-300 hover:scale-[1.02]",
      className
    )}
  >
    <Icon className="h-12 w-12 mb-6 text-zinc-900" />
    <h3 className="text-xl font-semibold text-zinc-900 mb-3">
      {title}
    </h3>
    <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">{description}</p>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl">
            Simple tool, <span className="font-semibold">powerful features</span>
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