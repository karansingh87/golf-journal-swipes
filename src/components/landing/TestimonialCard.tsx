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
      whileHover={{ y: -5 }}
      className="relative max-w-[400px] p-8 rounded-[24px] bg-white/90 backdrop-blur-sm border border-purple-100"
      style={{
        boxShadow: '0 4px 24px -1px rgba(124, 58, 237, 0.06), 0 2px 8px -1px rgba(124, 58, 237, 0.04)',
      }}
    >
      <p className="text-lg font-medium leading-relaxed tracking-[0.2px] text-zinc-700 mb-6">
        "{quote}"
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">{author}</span>
        <span className="text-sm text-zinc-500">{title}</span>
      </div>
      <div className="absolute bottom-6 right-6">
        <MessageSquareQuote 
          size={36} 
          className="text-purple-400/40" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;