import React from "react";
import { Mic, Languages, Brain, Heart, Target, Share2, Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "One-Touch Recording",
    description: "Start capturing thoughts instantly with a single tap",
    icon: Mic,
  },
  {
    title: "Multi-Language",
    description: "Record and review in your preferred language",
    icon: Languages,
  },
  {
    title: "Pattern Recognition",
    description: "AI identifies what works best in your game",
    icon: Brain,
  },
  {
    title: "Mental Game Analysis",
    description: "Track confidence triggers and pressure handling",
    icon: Heart,
  },
  {
    title: "Range Mode",
    description: "Quick notes during practice sessions",
    icon: Target,
  },
  {
    title: "Share with Coach",
    description: "Send structured insights to your instructor",
    icon: Share2,
  },
  {
    title: "Progress Timeline",
    description: "Watch your game evolve over time",
    icon: Clock,
  },
  {
    title: "Private & Secure",
    description: "Your thoughts stay private until shared",
    icon: Lock,
  },
];

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r border-zinc-200/80 py-12 px-8 relative group/feature w-full",
        "bg-white/80 backdrop-blur-sm hover:bg-gradient-to-br from-accent-sky-50/50 to-transparent",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b",
        index >= 4 && "lg:border-t lg:-mt-[1px]"
      )}
    >
      {/* Background gradients */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 
                      absolute inset-0 h-full w-full 
                      bg-gradient-to-t from-accent-peach-50/30 to-transparent 
                      pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 
                      absolute inset-0 h-full w-full 
                      bg-gradient-to-b from-accent-sky-50/30 to-transparent 
                      pointer-events-none" />
      )}
      
      <div className="mb-6 relative z-10">
        <div className="p-3 rounded-xl bg-accent-sky-50/80 w-fit 
                      group-hover/feature:bg-accent-peach-50 
                      transition-colors duration-500
                      shadow-sm group-hover/feature:shadow-md">
          <Icon className="h-6 w-6 text-zinc-600 group-hover/feature:text-zinc-800 
                         transition-all duration-500" 
               strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="text-xl font-display tracking-tight mb-3 relative z-10">
        <div className="absolute left-0 inset-y-0 h-full w-1 rounded-tr-full rounded-br-full 
                      bg-accent-sky-100/50 group-hover/feature:bg-accent-peach-100 
                      transition-all duration-500 origin-left
                      group-hover/feature:scale-y-110" />
        <span className="group-hover/feature:translate-x-2 transition duration-500 
                       inline-block text-zinc-900 font-semibold">
          {title}
        </span>
      </div>
      
      <p className="text-base font-sans text-zinc-500 group-hover/feature:text-zinc-600 
                   max-w-xs relative z-10 transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
};

const DetailedFeaturesSection = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(211,228,253,0.15),transparent_70%)] pointer-events-none" />
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
                Detailed Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold
                         text-zinc-900 tracking-tight mb-4
                         bg-gradient-to-br from-zinc-900 to-zinc-600
                         bg-clip-text text-transparent">
              Designed for serious golfers
            </h2>
            <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl">
              Every feature is thoughtfully crafted to enhance your golf journey
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10
                      bg-white/50 backdrop-blur-sm rounded-2xl
                      shadow-[0_4px_24px_-4px_rgba(16,24,40,0.08)]">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;