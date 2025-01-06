import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageSquare, Brain, PieChart, Users, Clock } from "lucide-react";

const features = [
  // Hero features (top row)
  {
    title: "Capture What Works",
    description: "Record your best rounds and practice sessions. What worked today? Your future self will thank you.",
    icon: Sparkles,
  },
  {
    title: "Zero Extra Work",
    description: "Just talk naturally about your game. We'll organize your insights and spot the patterns that matter.",
    icon: MessageSquare,
  },
  {
    title: "Beyond Numbers",
    description: "Understand your mental game, decision making, and course strategy. Not just another stats tracker.",
    icon: Brain,
  },
  // Supporting features (bottom row)
  {
    title: "Personal Patterns",
    description: "Discover your unique strengths and opportunities. Build on what already works for your game.",
    icon: PieChart,
  },
  {
    title: "Coach-Ready Insights",
    description: "Share detailed session notes with your coach. Make every lesson more focused and productive.",
    icon: Users,
  },
  {
    title: "Golf Time Machine",
    description: "Look back at your journey. What changed? What stayed consistent? Your story, your progress.",
    icon: Clock,
  },
];

const FeatureCard = ({ title, description, icon: Icon, isHero = false }) => (
  <Card className="relative overflow-hidden border-t-2 border-t-zinc-900 transition-all duration-200 hover:shadow-lg">
    <div className="p-6">
      {/* Small icon next to title */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-zinc-900" />
        <h3 className="font-poppins text-lg font-medium text-zinc-900">{title}</h3>
      </div>
      
      {/* Large watermark icon */}
      <div className="absolute top-4 right-4">
        <Icon className="w-12 h-12 text-zinc-900 opacity-[0.05]" />
      </div>
      
      {/* Description */}
      <p className="font-inter text-base text-zinc-600">{description}</p>
    </div>
  </Card>
);

const BenefitsSection = () => {
  const heroFeatures = features.slice(0, 3);
  const supportingFeatures = features.slice(3);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-8">
          {/* Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} isHero={true} />
            ))}
          </div>
          
          {/* Supporting Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportingFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;