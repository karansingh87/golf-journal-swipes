import React from "react";
import { NotebookPen, Brain, Flame, MessagesSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Golf Journal",
    description: "Voice or text, capture your golf thoughts naturally. Use it on the drive home, after practice, or whenever inspiration hits.",
    icon: NotebookPen,
    className: "md:col-start-1 md:col-span-1 md:row-span-2",
  },
  {
    title: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Flame,
    className: "md:col-start-1 md:col-span-1 md:row-span-1",
  },
  {
    title: "Deep Game Insights",
    description: "Let smart analysis uncover your patterns. From swing thoughts to pre-shot routines, see what actually works for YOUR game.",
    icon: Brain,
    className: "md:col-start-2 md:col-span-1 md:row-span-3",
  },
  {
    title: "Better Lessons",
    description: "Transform random thoughts into focused improvement areas. Share structured insights with your coach and track progress between sessions.",
    icon: MessagesSquare,
    className: "md:col-start-3 md:col-span-1 md:row-span-1",
  },
  {
    title: "Your Golf Evolution",
    description: "Watch your game transform as insights build. Every breakthrough saved, every pattern spotted, building your personal playbook for better golf.",
    icon: TrendingUp,
    className: "md:col-start-3 md:col-span-1 md:row-span-2",
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 md:auto-rows-[200px]">
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
      "group relative overflow-hidden rounded-[20px] p-4 lg:p-8 h-full",
      "bg-white",
      "border border-zinc-200/50",
      "shadow-[0_4px_12px_-2px_rgba(16,24,40,0.08),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
      "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
      "transition-all duration-300 ease-in-out",
      "hover:translate-y-[-2px]",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                    bg-gradient-to-br from-zinc-50 to-white
                    shadow-[0_2px_4px_rgba(16,24,40,0.08)]
                    group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-zinc-900" />
      </div>
      <h3 className="font-display text-xl lg:text-2xl text-zinc-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const BenefitsSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(211,228,253,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 sm:mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
              <span className="text-sm font-medium text-zinc-900">
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