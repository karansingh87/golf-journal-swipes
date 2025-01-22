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
    <section className="py-20 sm:py-28 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(211,228,253,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-zinc-950">
            <span className="text-sm font-medium text-zinc-50">
              Journal Anytime
            </span>
          </div>
        </div>
        
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {stories.map((story) => (
            <Card 
              key={story.title}
              className={cn(
                "group relative overflow-hidden aspect-square",
                "bg-gradient-to-br from-white via-zinc-50/90 to-zinc-100/90",
                "backdrop-blur-sm border border-zinc-200/80",
                "shadow-[0_4px_12px_-2px_rgba(16,24,40,0.08),0_2px_6px_-2px_rgba(16,24,40,0.06)]",
                "hover:shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_4px_12px_-4px_rgba(16,24,40,0.08)]",
                "transition-all duration-300",
                "hover:translate-y-[-2px]",
                "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_right,rgba(155,135,245,0.05),transparent_60%)]"
              )}
            >
              <CardContent className="p-3 sm:p-4 h-full flex flex-col items-center justify-center text-center gap-4 sm:gap-6 relative z-10">
                <story.icon className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-900 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-sm sm:text-base font-medium text-golf-gray-text-primary">
                  {story.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GolferStoriesSection;