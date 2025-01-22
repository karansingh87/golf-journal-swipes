import React from "react";
import { NotebookPen, Brain, Flame, MessagesSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Golf Journal",
    description: "Simply talk or type your golf thoughts on the go. Capture insights whenever they strike.",
    icon: NotebookPen,
    className: "md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2",
  },
  {
    title: "Instant Confidence",
    description: "AI-powered pep talks based on your successes. Remember what works before you play.",
    icon: Flame,
    className: "md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1.5",
  },
  {
    title: "Deep Game Insights",
    description: "AI analysis reveals what works in your game. From swing thoughts to pre-shot routines.",
    icon: Brain,
    className: "md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-3",
  },
  {
    title: "Better Lessons",
    description: "Share focused insights with your coach. Track progress between sessions.",
    icon: MessagesSquare,
    className: "md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1.5",
  },
  {
    title: "Your Golf Evolution",
    description: "Watch patterns emerge. Build your personal playbook for better golf.",
    icon: TrendingUp,
    className: "md:col-start-3 md:col-span-1 md:row-start-2.5 md:row-span-2",
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[180px]">
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  description,
  Icon,
  className,
  index,
}: {
  title: string;
  description: string;
  Icon: any;
  className?: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className={cn(
      "group relative overflow-hidden h-full bg-white border border-zinc-200",
      "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
      "transition-all duration-300 ease-in-out",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col p-6">
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <Icon className="h-5 w-5 text-zinc-600" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-bold mb-2 text-zinc-900 group-hover:translate-x-2 transition duration-200">
          {title}
        </h3>
      </div>
      <p className="text-sm text-zinc-600 leading-normal">
        {description}
      </p>
    </div>
    <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
  </motion.div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(211,228,253,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 sm:mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-zinc-950">
              <span className="text-sm font-medium text-zinc-50">
                Core Features
              </span>
            </div>
          </div>
        </div>
        
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              className={feature.className}
              index={index}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default BenefitsSection;