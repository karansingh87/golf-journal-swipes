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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm border border-zinc-200/50 rounded-[24px] p-8 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-lg">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900">{title}</h3>
        <ul className="text-zinc-600 text-lg space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md">
              <h2 className="text-sm font-medium text-zinc-900">Features</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;