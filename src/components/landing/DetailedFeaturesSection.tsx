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
    title: "Multi-Language Support",
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

const DetailedFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(211,228,253,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 sm:mb-20">
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
              <span className="text-sm font-medium text-zinc-900">
                Detailed Features
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-[20px] p-6",
                "bg-white",
                "border border-zinc-200/50",
                "shadow-[0_4px_12px_-2px_rgba(16,24,40,0.08),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
                "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
                "transition-all duration-300 ease-in-out",
                "hover:translate-y-[-2px]"
              )}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center
                              bg-gradient-to-br from-zinc-50 to-white
                              shadow-[0_2px_4px_rgba(16,24,40,0.08)]
                              group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-zinc-900" />
                </div>
                <h3 className="font-display text-lg text-zinc-900 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;