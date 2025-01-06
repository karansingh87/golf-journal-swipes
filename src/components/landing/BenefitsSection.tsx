import React from "react";
import { MessageSquare, Brain, PieChart, Users, TrendingUp, Timer } from "lucide-react";

const features = [
  {
    title: "Capture On Your Terms",
    description: "Record your thoughts your way - voice notes on the drive home, quick text after a range session, or whenever it feels right. No manual tracking, just capture insights on your terms.",
    icon: MessageSquare,
  },
  {
    title: "Personal Patterns",
    description: "Discover your unique performance triggers. From practice drills to pre-shot routines, see what really improves your scores.",
    icon: PieChart,
  },
  {
    title: "Beyond the Numbers",
    description: "While others track just scores and stats, GolfLog captures the complete story of your golf journey. Understand what actually works for YOUR game.",
    icon: Brain,
  },
  {
    title: "Your Golf Time Machine",
    description: "Go back to any breakthrough moment. That perfect drive or game-changing range session? Every insight saved and searchable.",
    icon: Timer,
  },
  {
    title: "Coach-Ready Insights",
    description: "Share focused insights with your coach. No more \"What were we working on last time?\" Transform your practice and play.",
    icon: Users,
  },
  {
    title: "Practice to Performance",
    description: "Connect your range breakthroughs to course success. See which practice methods deliver real results for your game.",
    icon: TrendingUp,
  },
];

const FeatureItem = ({ title, description, icon: Icon }) => (
  <div className="relative py-4">
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col items-start space-y-2">
        <div className="text-zinc-900">
          <Icon className="w-3 h-3" />
        </div>
        <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      </div>
      <p className="text-sm text-zinc-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-zinc-900/5">
          <div className="mb-16">
            <h2 className="text-3xl font-medium text-zinc-900 max-w-2xl">
              Simple tool, powerful features
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;