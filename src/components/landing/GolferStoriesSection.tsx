import React from "react";
import { Car, Target, Beer, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const stories = [
  {
    title: "Talk through rounds on the drive home",
    icon: Car,
  },
  {
    title: "Quick notes during range sessions",
    icon: Target,
  },
  {
    title: "Capture thoughts at the 19th hole",
    icon: Beer,
  },
  {
    title: "Review rounds from home",
    icon: Home,
  },
];

const GolferStoriesSection = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(211,228,253,0.15),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-20 sm:mb-24"
        >
          <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6
                        bg-gradient-to-r from-zinc-950 to-zinc-800
                        shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <span className="text-sm font-medium text-zinc-50">
              Journal Anytime
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold
                       text-zinc-900 tracking-tight mb-4
                       bg-gradient-to-br from-zinc-900 to-zinc-600
                       bg-clip-text text-transparent">
            Capture insights anywhere
          </h2>
          <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl">
            Your golf journal goes wherever you go
          </p>
        </motion.div>
        
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "group relative overflow-hidden aspect-square",
                  "bg-gradient-to-br from-white via-zinc-50/90 to-zinc-100/90",
                  "hover:from-accent-peach-50/80 hover:via-accent-sky-50/60 hover:to-white",
                  "backdrop-blur-sm border border-zinc-200/80",
                  "shadow-[0_4px_12px_-2px_rgba(16,24,40,0.08),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
                  "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
                  "transition-all duration-500",
                  "hover:translate-y-[-4px]",
                  "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_right,rgba(211,228,253,0.15),transparent_60%)]"
                )}
              >
                <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center gap-6 relative z-10">
                  <div className="p-4 rounded-xl bg-accent-sky-50/80 
                               group-hover:bg-accent-peach-50 
                               transition-colors duration-500
                               shadow-sm group-hover:shadow-md">
                    <story.icon className="h-8 w-8 sm:h-10 sm:w-10 
                                        text-zinc-600 group-hover:text-zinc-800 
                                        transition-all duration-500 
                                        group-hover:scale-110" 
                              strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold 
                               text-zinc-900 group-hover:text-zinc-800
                               transition-colors duration-500">
                    {story.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;