import React from "react";
import { MessageSquare, Brain, PieChart, Users, TrendingUp, Timer } from "lucide-react";

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
  <div className="relative group p-8 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 rounded-full bg-zinc-900 text-white">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-poppins text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="text-base text-zinc-600 leading-relaxed max-w-lg mx-auto">{description}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-50 to-white p-8 shadow-xl ring-1 ring-zinc-900/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="relative">
            <div className="flex flex-col items-center space-y-8 mb-16">
              <h2 className="text-3xl font-medium text-center text-zinc-900 max-w-2xl font-sans">
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
      </div>
    </section>
  );
};

export default BenefitsSection;