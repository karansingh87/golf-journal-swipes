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
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[200px]">
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
      "group relative overflow-hidden p-6 h-full",
      "bg-white/80 backdrop-blur-sm",
      "border border-zinc-200/50",
      "hover:bg-gradient-to-br from-accent-peach-50 to-accent-sky-50",
      "hover:border-accent-peach-100/50",
      "shadow-[0_4px_12px_-2px_rgba(16,24,40,0.08),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
      "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
      "transition-all duration-500 ease-out",
      "hover:translate-y-[-4px]",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-end mb-4">
        <div className="mb-4 flex items-center">
          <div className="p-3 rounded-xl bg-accent-sky-50 group-hover:bg-accent-peach-50 transition-colors duration-500">
            <Icon className="h-6 w-6 text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="font-display text-xl lg:text-2xl text-zinc-900 tracking-tight leading-snug font-semibold">
          {title}
        </h3>
      </div>
      <p className="text-base font-normal text-zinc-500 group-hover:text-zinc-600 font-sans leading-relaxed">
        {description}
      </p>
    </div>
    
    {/* Decorative background elements */}
    <div className="absolute bottom-0 right-0 w-32 h-32 
                    bg-gradient-to-br from-accent-sky-100/20 to-accent-peach-100/20 
                    rounded-full blur-2xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 pointer-events-none" />
    <div className="absolute -right-6 -bottom-6 w-24 h-24 
                    bg-gradient-to-br from-accent-peach-100/30 to-accent-sky-100/30 
                    rounded-full blur-xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 pointer-events-none" />
  </motion.div>
);

const BenefitsSection = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(211,228,253,0.1),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-20 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6
                          bg-gradient-to-r from-zinc-950 to-zinc-800
                          shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
              <span className="text-sm font-medium text-zinc-50">
                Core Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold
                         text-zinc-900 tracking-tight mb-4
                         bg-gradient-to-br from-zinc-900 to-zinc-600
                         bg-clip-text text-transparent">
              Everything you need to improve your game
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl">
              Powerful features designed to help you track, analyze, and enhance your golf performance
            </p>
          </motion.div>
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