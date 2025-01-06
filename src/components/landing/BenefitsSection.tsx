import React from "react";
import { Sparkles, MessageSquare, Brain, PieChart, Users, TrendingUp, Timer } from "lucide-react";

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
  <div className="flex flex-col items-start text-left">
    <div className="mb-3">
      <Icon className="w-6 h-6 text-zinc-900" />
    </div>
    <h3 className="font-poppins text-base font-medium text-zinc-900 mb-2">{title}</h3>
    <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">{description}</p>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start space-y-4 mb-12">
          <div className="w-20 h-px bg-zinc-200" />
          <h2 className="text-3xl sm:text-4xl font-medium text-zinc-900">
            Simple tool, powerful insights.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;