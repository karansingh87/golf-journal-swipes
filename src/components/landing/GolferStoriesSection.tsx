import React from "react";
import { Car, Target, Beer, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-golf-subtle">
            <span className="text-sm font-medium text-zinc-900">
              Journal Anytime
            </span>
          </div>
        </div>
        
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {stories.map((story, index) => (
            <Card 
              key={story.title}
              className={cn(
                "group relative overflow-hidden",
                "bg-gradient-to-br from-white via-zinc-100 to-zinc-200",
                "backdrop-blur-sm border border-zinc-200",
                "shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1),0_2px_4px_-2px_rgba(16,24,40,0.06)]",
                "hover:shadow-[0_8px_16px_-4px_rgba(16,24,40,0.1),0_4px_8px_-4px_rgba(16,24,40,0.1)]",
                "transition-all duration-300 ease-in-out",
                "hover:translate-y-[-2px]"
              )}
            >
              <CardContent className="p-4 sm:p-6 h-full flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
                <div className="mb-2 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                              bg-gradient-to-br from-zinc-100 to-white
                              shadow-[0_2px_4px_rgba(16,24,40,0.1)]
                              group-hover:scale-110 transition-transform duration-300">
                  <story.icon className="w-6 h-6 lg:w-7 lg:h-7 text-zinc-900" />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-zinc-900">
                  {story.title}
                </h3>
              </CardContent>
              
              {/* Animated gradient blob - always visible */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 
                            bg-gradient-to-br from-zinc-200/70 to-zinc-100/40 
                            rounded-full blur-2xl opacity-70
                            animate-pulse-ring" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;