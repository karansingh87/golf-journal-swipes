import React from "react";
import { Sparkles, MessageSquare, Brain, PieChart, Users, TrendingUp } from "lucide-react";

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
    icon: Clock,
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
  <div className="flex items-start space-x-3">
    <Icon className="w-5 h-5 text-zinc-900 mt-1 flex-shrink-0" />
    <div>
      <h3 className="text-sm font-medium text-zinc-900 mb-1">{title}</h3>
      <p className="text-sm text-zinc-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;