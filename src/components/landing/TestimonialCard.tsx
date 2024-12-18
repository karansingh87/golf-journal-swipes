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
      className="relative max-w-[400px] p-7 rounded-[20px] bg-[#ACE580] text-golf-green"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <p className="text-base leading-relaxed tracking-[0.2px] text-golf-green mb-5">
        {quote}
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-golf-green">{author}</span>
        <span className="text-xs text-golf-muted">{title}</span>
      </div>
      <div className="absolute bottom-5 right-5">
        <MessageSquareQuote 
          size={30} 
          className="opacity-80" 
          fill="hsl(240 5.9% 10%)"
          stroke="#ACE580"
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;