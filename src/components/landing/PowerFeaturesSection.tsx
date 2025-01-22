import React from "react";
import { Car, Target, Beer } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Talk through rounds on the drive home",
    description: "Record your thoughts and reflections right after finishing your round while everything is still fresh in your mind.",
    icon: Car,
  },
  {
    title: "Quick notes during range sessions",
    description: "Capture swing thoughts and practice insights in real-time as you work on your game at the driving range.",
    icon: Target,
  },
  {
    title: "Capture thoughts on 19th hole",
    description: "Save those post-round insights and observations while relaxing after your game.",
    icon: Beer,
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
      "bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-700/90",
      "backdrop-blur-sm border border-zinc-800/30",
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2),0_2px_6px_-2px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.2)]",
      "transition-all duration-300 ease-in-out",
      "hover:translate-y-[-2px]",
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(155,135,245,0.1),transparent_60%)]",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                    bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-600
                    shadow-[0_2px_4px_rgba(0,0,0,0.2)]
                    group-hover:scale-110 transition-transform duration-300
                    group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-zinc-100" />
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-zinc-100 mb-2 tracking-tight">
        {title}
      </h3>
    </div>
    
    <div className="absolute -right-6 -bottom-6 w-32 h-32 
                    bg-gradient-to-br from-purple-500/20 to-blue-500/10 
                    rounded-full blur-2xl opacity-70
                    animate-pulse-ring" />
  </motion.div>
);

const PowerFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(229,222,255,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 sm:mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-zinc-950">
              <span className="text-sm font-medium text-zinc-50">
                Deeper Insights
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

export default PowerFeaturesSection;