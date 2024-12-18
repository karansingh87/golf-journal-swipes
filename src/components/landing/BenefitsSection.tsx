import { Brain, BookOpenText, Target, Mic } from "lucide-react";
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
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="rounded-full bg-[#052e16] p-4">
          <Icon className="w-6 h-6 text-[#4ade80]" />
        </div>
        <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      </div>
      <ul className="space-y-4 pl-[calc(4rem+16px)]">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-gray-300 text-lg mt-1">•</span>
            <span className="text-[#4B5563] text-base">{benefit}</span>
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
      Icon: Target,
      benefits: [
        "Find your best pre-shot routines",
        "See which practice drills work",
        "Track lasting swing changes",
        "Spot your peak performance triggers",
      ],
    },
    {
      title: "Build Real Confidence",
      Icon: Brain,
      benefits: [
        "Review your success patterns",
        "Remember what works for you",
        "Turn breakthroughs into habits",
        "Build your winning mindset",
      ],
    },
    {
      title: "Improve Without Extra Work",
      Icon: Mic,
      benefits: [
        "Just talk after you play",
        "No typing needed",
        "Get automatic insights",
        "Find any moment instantly",
      ],
    },
    {
      title: "Never Lose Another Insight",
      Icon: BookOpenText,
      benefits: [
        "Capture breakthroughs instantly",
        "Remember what made the difference",
        "Build on what's working",
        "Create your playbook",
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