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
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center space-y-4"
    >
      <div className="w-12 h-12 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
      <ul className="text-zinc-600 text-base space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#F2FCE2]/80 to-transparent rounded-2xl mx-4 sm:mx-8 lg:mx-16 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-16">
              <div className="bg-white px-4 py-1.5 rounded-full shadow-card-light">
                <h2 className="text-sm font-medium text-zinc-900">Features</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;