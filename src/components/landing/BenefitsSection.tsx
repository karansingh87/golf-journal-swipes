import { Brain, BookOpenText, Target, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface BenefitProps {
  title: string;
  description: string;
  Icon: React.ComponentType<any>;
  index: number;
}

const Benefit = ({ title, description, Icon, index }: BenefitProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-[#ACE580]/5 rounded-2xl blur-2xl group-hover:bg-[#ACE580]/10 transition-all duration-500" />
      <div className="relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/30 hover:border-[#ACE580]/20 transition-colors duration-300">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ACE580] text-zinc-900 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#ACE580]/20 rounded-xl blur-xl" />
            <Icon className="w-6 h-6 relative z-10" />
          </div>
          <h3 className="text-3xl font-medium text-white/90">{title}</h3>
          <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Record Your Thoughts",
      description: "Just talk after your round or practice session. No typing needed - your voice is all it takes to capture every insight.",
      Icon: Mic,
    },
    {
      title: "Get AI Insights",
      description: "Our AI analyzes your recordings to spot patterns and opportunities, helping you understand your game better than ever.",
      Icon: Brain,
    },
    {
      title: "Track Your Progress",
      description: "Watch your game evolve over time with detailed trends and analytics that show you exactly what's working.",
      Icon: Target,
    },
    {
      title: "Build Your Playbook",
      description: "Create your personal golf knowledge base. Every insight and breakthrough is saved and organized for easy reference.",
      Icon: BookOpenText,
    },
  ];

  return (
    <section className="py-32 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-medium text-white">Features</h2>
            <p className="text-xl text-zinc-400">
              Everything you need to improve your golf game, all in one place.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;