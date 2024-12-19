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
      className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-zinc-100"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.03), 0 2px 8px -1px rgba(0, 0, 0, 0.02)',
      }}
    >
      <p className="text-lg font-medium leading-relaxed tracking-tight text-zinc-900 mb-6">
        "{quote}"
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-zinc-900">{author}</span>
        <span className="text-sm text-zinc-600">{title}</span>
      </div>
      <div className="absolute bottom-6 right-6">
        <MessageSquareQuote 
          size={32} 
          className="text-zinc-200" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;