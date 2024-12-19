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
      className="relative p-8 rounded-2xl glass-card hover-scale"
    >
      <p className="text-lg font-medium leading-relaxed tracking-wide text-zinc-800 mb-6">
        "{quote}"
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-zinc-900">{author}</span>
        <span className="text-sm text-zinc-600">{title}</span>
      </div>
      <div className="absolute bottom-6 right-6">
        <MessageSquareQuote 
          size={32} 
          className="text-zinc-900/10" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;