import React from "react";
import { Car, Target, Beer, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const stories = [
  {
    title: "Talk through rounds during the drive home",
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-zinc-900 text-left mb-16">
          Journal Anytime
        </h2>
        
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {stories.map((story) => (
            <Card 
              key={story.title}
              className={cn(
                "group relative overflow-hidden aspect-square",
                "bg-white/80 backdrop-blur-sm border border-border/50",
                "shadow-card-light hover:shadow-lg transition-all duration-300",
                "hover:translate-y-[-2px]"
              )}
            >
              <CardContent className="p-3 sm:p-4 h-full flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
                <story.icon className="h-8 w-8 sm:h-10 sm:w-10 text-golf-gray-light transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-sm sm:text-base font-normal sm:font-medium text-golf-gray-text-primary">
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