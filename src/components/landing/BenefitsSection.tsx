import React from "react";
import { NotebookPen, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
      "group relative overflow-hidden rounded-[20px] p-4 lg:p-8",
      "bg-gradient-to-br from-white via-stone-50/95 to-stone-100",
      "bg-[linear-gradient(135deg,white,rgba(155,135,245,0.05),rgb(245,245,244))]",
      "backdrop-blur-sm border border-zinc-200",
      "shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1),0_2px_4px_-2px_rgba(16,24,40,0.06)]",
      "hover:shadow-[0_8px_16px_-4px_rgba(16,24,40,0.1),0_4px_8px_-4px_rgba(16,24,40,0.1)]",
      "transition-all duration-300 ease-in-out",
      "hover:translate-y-[-2px]",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                    bg-gradient-to-br from-zinc-100 to-white
                    shadow-[0_2px_4px_rgba(16,24,40,0.1)]
                    group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-zinc-900" />
      </div>
      <h3 className="text-xl lg:text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
        {description}
      </p>
    </div>
    
    {/* Animated gradient blob - always visible on mobile */}
    <div className="absolute -right-6 -bottom-6 w-32 h-32 
                    bg-gradient-to-br from-stone-200/70 to-[rgba(155,135,245,0.1)]
                    rounded-full blur-2xl opacity-70
                    animate-pulse-ring" />
  </motion.div>
);

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
              <span className="text-sm font-medium text-zinc-900">
                <span className="font-bold">Core</span>{" "}
                <span className="font-medium">Features</span>
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
              index={index}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default BenefitsSection;