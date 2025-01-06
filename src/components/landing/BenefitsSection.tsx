import React from "react";
import { Sparkles, MessageSquare, Brain, PieChart, Users, TrendingUp, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Capture On Your Terms",
    description: "Record your thoughts your way - voice notes on the drive home, quick text after a range session, or whenever it feels right. Smart analysis turns your natural golf talk into clear insights.",
    icon: MessageSquare,
  },
  {
    title: "Personal Patterns",
    description: "Intelligent pattern detection spots your unique performance triggers. From practice drills to pre-shot routines, see what actually improves your game. Like having a brilliant caddie in your pocket.",
    icon: PieChart,
  },
  {
    title: "Beyond the Numbers",
    description: "While others track just scores and stats, GolfLog's deep analysis captures your complete golf story. Understand the mental game tricks and swing thoughts that work for YOUR game.",
    icon: Brain,
  },
  {
    title: "Your Golf Time Machine",
    description: "Every breakthrough moment automatically tagged and instantly searchable. That perfect drive or game-changing range session? Build on what works with smart pattern recognition.",
    icon: Timer,
  },
  {
    title: "Coach-Ready Insights",
    description: "Share focused insights with your coach. Automated progress tracking spots trends and patterns. No more \"What were we working on last time?\"",
    icon: Users,
  },
  {
    title: "Practice to Performance",
    description: "Advanced analytics connect your range breakthroughs to course success. See which practice methods deliver real results, backed by real performance data.",
    icon: TrendingUp,
  },
];

const FeatureItem = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center text-center rounded-lg p-8 w-full max-w-none">
    <div className="mb-3">
      <Icon className="w-6 h-6 text-zinc-900" />
    </div>
    <h3 className="font-poppins text-base font-medium text-zinc-900 mb-2 w-full">{title}</h3>
    <p className="text-sm font-inter text-zinc-600 leading-relaxed w-full max-w-none px-4 sm:px-8 md:px-12">{description}</p>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-12 lg:px-16">
        <div className="group rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center space-y-4 mb-12">
              <Badge 
                variant="outline" 
                className="bg-zinc-900 hover:bg-zinc-800 text-white border-0 rounded-full px-4 py-1 text-sm font-medium"
              >
                Features
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {features.map((feature) => (
                <FeatureItem key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;