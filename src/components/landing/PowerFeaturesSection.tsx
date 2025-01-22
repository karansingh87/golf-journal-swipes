import React from "react";
import { Car, Target, Beer, Mic, Share2 } from "lucide-react";
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
  {
    title: "Voice or text, your choice",
    description: "Whether you prefer speaking or typing, capture your golf insights your way.",
    icon: Mic,
  },
  {
    title: "Share with your coach",
    description: "Easily share your practice notes and round insights with your golf instructor.",
    icon: Share2,
  },
];

const Feature = ({
  title,
  Icon,
  description,
  index,
}: {
  title: string;
  description: string;
  Icon: any;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className={cn(
      "group relative overflow-hidden p-6 h-full",
      "bg-zinc-800 border border-zinc-700/30 rounded-[10px]",
      "transition-all duration-300 ease-in-out",
      "hover:shadow-lg"
    )}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 rounded-full w-12 h-12 flex items-center justify-center
                    bg-zinc-700 shadow-lg
                    group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-zinc-100" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-400">
        {description}
      </p>
    </div>
    
    <div className="absolute -right-6 -bottom-6 w-32 h-32 
                    bg-gradient-to-br from-zinc-700/20 to-zinc-600/10 
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
                Journal Anytime
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerFeaturesSection;