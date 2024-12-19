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
      transition={{ duration: 0.3 }}
      className="relative max-w-[400px] p-8 rounded-[24px] bg-white/80 backdrop-blur-sm border border-zinc-100 card-shadow"
    >
      <p className="text-lg font-medium leading-relaxed tracking-[0.2px] text-zinc-800 mb-6">
        "{quote}"
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-zinc-900">{author}</span>
        <span className="text-sm text-zinc-500">{title}</span>
      </div>
      <div className="absolute bottom-6 right-6">
        <MessageSquareQuote 
          size={32} 
          className="text-[#ACE580]" 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;