import { motion } from "framer-motion";

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

const HowItWorksStep = ({ number, title, description, image, index }: HowItWorksStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-[#ACE580]/5 rounded-3xl blur-2xl group-hover:bg-[#ACE580]/10 transition-all duration-500" />
      <div className="relative bg-zinc-900 rounded-3xl p-8 border border-zinc-700/50 hover:border-[#ACE580]/20 transition-colors duration-300">
        {/* Step Number with bloom effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-800 w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ACE580]/10 rounded-full blur-lg" />
          <span className="text-white font-medium relative z-10">{number}</span>
        </div>
        
        {/* Image Container with bloom effect */}
        <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden">
          <img
            src={`https://images.unsplash.com/${image}`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorksStep;