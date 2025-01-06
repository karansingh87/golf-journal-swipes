import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageSquare, Brain, PieChart, Users, Clock } from "lucide-react";

const features = [
  // Hero features (top row)
  {
    title: "Capture What Works",
    description: "Those magical rounds and practice breakthroughs? Finally understand why. Keep your best moments before they fade.",
    icon: Sparkles,
  },
  {
    title: "Zero Extra Work",
    description: "No typing. No manual tracking. Just talk about your golf like you already do. We'll turn your words into insights.",
    icon: MessageSquare,
  },
  {
    title: "Beyond the Numbers",
    description: "While others track just scores and stats, GolfLog captures your complete golf story. Understand what actually works for YOUR game.",
    icon: Brain,
  },
  // Supporting features (bottom row)
  {
    title: "Personal Patterns",
    description: "Discover your unique performance triggers. From practice drills to pre-shot routines, see what really improves your scores.",
    icon: PieChart,
  },
  {
    title: "Coach-Ready Insights",
    description: "Share focused insights with your coach. No more \"What were we working on last time?\" Transform your practice and play.",
    icon: Users,
  },
  {
    title: "Your Golf Time Machine",
    description: "Go back to any breakthrough moment. That perfect drive or game-changing range session? Every insight saved and searchable.",
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