import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
}

const TestimonialCard = ({ quote, author, title }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative max-w-[480px] p-12 md:p-[48px_40px] rounded-[32px] bg-golf-green border border-golf-subtle"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.12), 0 2px 8px -1px rgba(0, 0, 0, 0.08)',
      }}
    >
      <p className="text-lg md:text-xl leading-relaxed tracking-[0.2px] text-golf-white mb-8">
        {quote}
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-golf-white">{author}</span>
        <span className="text-sm text-golf-gray-light">{title}</span>
      </div>
      <div className="absolute bottom-8 right-8">
        <Quote 
          size={32} 
          className="text-[#ACE580] opacity-60 transform -rotate-180 stroke-[2]" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;