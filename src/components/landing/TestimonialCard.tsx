import { TextQuote } from "lucide-react";
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
      className="relative max-w-[420px] p-8 rounded-[24px] bg-golf-green text-golf-white"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <p className="text-base leading-relaxed tracking-[0.2px] text-golf-white mb-6">
        {quote}
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-golf-white">{author}</span>
        <span className="text-xs text-golf-gray-light">{title}</span>
      </div>
      <div className="absolute bottom-6 right-6">
        <TextQuote 
          size={32} 
          className="text-golf-gray-light opacity-80 stroke-[1.5]" 
          fill="#ACE580"
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;