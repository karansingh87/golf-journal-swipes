import { MessageSquareQuote } from "lucide-react";
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
      className="relative max-w-[400px] p-7 rounded-[20px] bg-white/80 backdrop-blur-sm border border-zinc-200"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.03), 0 2px 8px -1px rgba(0, 0, 0, 0.02)',
      }}
    >
      <p className="text-base font-light leading-relaxed tracking-[0.2px] text-golf-gray-text-primary mb-5">
        "{quote}"
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-normal text-golf-gray-text-primary">{author}</span>
        <span className="text-xs text-golf-gray-text-secondary">{title}</span>
      </div>
      <div className="absolute bottom-5 right-5">
        <MessageSquareQuote 
          size={30} 
          className="text-[#ACE580] opacity-60" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;