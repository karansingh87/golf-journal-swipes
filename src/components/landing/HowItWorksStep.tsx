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
      className="relative bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700/50"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden">
        <img
          src={`https://images.unsplash.com/${image}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-[2px]" />
      </div>
      
      {/* Content */}
      <div className="relative">
        <div className="absolute -top-4 left-8 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
          <span className="text-white font-medium">{number}</span>
        </div>
        <div className="space-y-3 pt-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-zinc-400 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorksStep;