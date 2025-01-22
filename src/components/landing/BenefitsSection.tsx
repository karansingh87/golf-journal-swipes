import React from "react";
import { NotebookPen, Brain, Flame, MessagesSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Golf Journal",
    description: "Voice or text, capture your golf thoughts naturally. Use it on the drive home, after practice, or whenever inspiration hits.",
    icon: NotebookPen,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Your Golf Evolution",
    description: "Watch your game transform as insights build. Every breakthrough saved, every pattern spotted, building your personal playbook for better golf.",
    icon: TrendingUp,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Deep Game Insights",
    description: "Let smart analysis uncover your patterns. From swing thoughts to pre-shot routines, see what actually works for YOUR game.",
    icon: Brain,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Flame,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Better Lessons",
    description: "Transform random thoughts into focused improvement areas. Share structured insights with your coach and track progress between sessions.",
    icon: MessagesSquare,
    className: "md:col-span-1 md:row-span-1",
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[180px]">
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
      "group relative overflow-hidden rounded-2xl p-6 md:p-8",
      "bg-white",
      "border border-zinc-200",
      "shadow-sm hover:shadow-md",
      "transition-all duration-300 ease-in-out",
      "h-full",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center
                    bg-gradient-to-br from-zinc-50 to-white
                    shadow-sm group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-zinc-900" />
      </div>
      <h3 className="font-display text-lg md:text-xl text-zinc-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
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
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
              <span className="text-sm font-medium text-zinc-900">
                Core Features
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 auto-rows-[240px]">
          {/* First column */}
          <div className="col-span-1 space-y-4">
            <BentoCard
              key={features[0].title}
              title={features[0].title}
              description={features[0].description}
              Icon={features[0].icon}
              index={0}
            />
            <BentoCard
              key={features[3].title}
              title={features[3].title}
              description={features[3].description}
              Icon={features[3].icon}
              index={3}
            />
          </div>
          
          {/* Middle column - Deep Game Insights */}
          <div className="col-span-1">
            <div className="h-full">
              <BentoCard
                key={features[2].title}
                title={features[2].title}
                description={features[2].description}
                Icon={features[2].icon}
                index={2}
                className="h-[484px]"
              />
            </div>
          </div>
          
          {/* Last column */}
          <div className="col-span-1 space-y-4">
            <BentoCard
              key={features[1].title}
              title={features[1].title}
              description={features[1].description}
              Icon={features[1].icon}
              index={1}
            />
            <BentoCard
              key={features[4].title}
              title={features[4].title}
              description={features[4].description}
              Icon={features[4].icon}
              index={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;