import { Brain, BookOpenText, Target, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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
    >
      <Card className="h-full p-8 bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        <div className="absolute inset-0 rounded-lg bg-[#F2FCE2]/40 blur-[64px] -z-10" />
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-14 h-14 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h3>
          <ul className="text-zinc-600 text-base space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="leading-relaxed">{benefit}</li>
            ))}
          </ul>
        </div>
      </Card>
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
    <section className="pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-zinc-50/80 to-transparent rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-20">
              <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-zinc-100">
                <h2 className="text-sm font-semibold text-zinc-900">Features</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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