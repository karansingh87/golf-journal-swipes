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
    <div
      className={cn(
        "flex flex-col lg:border-r border-zinc-200 h-[280px] relative group/feature w-full bg-white",
        (index === 0) && "lg:border-l",
        index < 4 && "lg:border-b",
        index >= 4 && "lg:border-t lg:-mt-[1px]"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-zinc-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 pt-10 text-zinc-600">
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-300 group-hover/feature:bg-zinc-900 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-zinc-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

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
        
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="w-full"
            >
              <Feature {...feature} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerFeaturesSection;