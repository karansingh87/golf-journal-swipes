import { Brain, BookOpen, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface BenefitCardProps {
  title: string;
  Icon: React.ComponentType<any>;
  benefits: string[];
}

const BenefitCard = ({ title, Icon, benefits }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="rounded-lg bg-[#f8faf9] p-2">
          <Icon className="w-8 h-8 text-[#047857]" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-[#047857] text-lg mt-1">•</span>
            <span className="text-zinc-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Unlock Hidden Patterns",
      Icon: Sparkles,
      benefits: [
        "Find the pre-shot routines that lead to your best scores",
        "Discover which practice drills actually improve your game",
        "Track swing changes that stick versus temporary fixes",
        "Identify your optimal mental state for peak performance",
      ],
    },
    {
      title: "Build Real Confidence",
      Icon: Brain,
      benefits: [
        "Review past successes before important rounds",
        "Remember exactly what worked in your best performances",
        "Turn one-off breakthroughs into repeatable strategies",
        "Build a library of personal swing thoughts that work",
      ],
    },
    {
      title: "Improve Without Extra Work",
      Icon: Zap,
      benefits: [
        "Speak naturally, just like you already do after rounds",
        "No manual tracking or typing required",
        "Get insights automatically from your normal golf chat",
        "Access your full golf journey in seconds",
      ],
    },
    {
      title: "Never Lose Another Insight",
      Icon: BookOpen,
      benefits: [
        "Capture those aha moments before they slip away",
        "Remember the small adjustments that made big differences",
        "Build on what's working instead of starting over",
        "Create your personal playbook of proven solutions",
      ],
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;