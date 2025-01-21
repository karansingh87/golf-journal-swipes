import React from "react";
import { Blend, Flame, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Trend Spotting",
    description: "See patterns across multiple rounds. Smart analysis connects the dots between your best performances.",
    icon: Blend,
  },
  {
    title: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Flame,
  },
  {
    title: "Better Lessons",
    description: "Share structured insights with your coach. Transform random thoughts into focused improvement plans.",
    icon: MessagesSquare,
  },
];

const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 lg:max-w-[1400px] mx-auto">
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
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className={cn(
      "group relative overflow-hidden rounded-[20px] p-4 lg:p-8",
      "bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-700/90",
      "backdrop-blur-sm border border-zinc-800/30",
      "lg:min-h-[380px] lg:w-[380px]",
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2),0_2px_6px_-2px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.2)]",
      "transition-all duration-300 ease-in-out",
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(155,135,245,0.1),transparent_60%)]",
      className
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 rounded-full w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center
                    bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-600
                    shadow-[0_2px_4px_rgba(0,0,0,0.2)]
                    group-hover:scale-110 transition-transform duration-300
                    group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]">
        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-100 group-hover:rotate-6 transition-transform duration-300" />
      </div>
      <h3 className="text-xl lg:text-2xl font-semibold text-zinc-100 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
    
    <div className="absolute -right-6 -bottom-6 w-32 h-32 
                    bg-gradient-to-br from-purple-500/20 to-blue-500/10 
                    rounded-full blur-2xl opacity-70
                    group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

const PowerFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(155,135,245,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 lg:block hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 sm:mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
              <span className="text-sm font-medium text-zinc-900">
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