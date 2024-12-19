import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
}

const TestimonialCard = ({ quote, author, title }: TestimonialCardProps) => {
  return (
    <motion.div
      className="relative w-[400px] p-8 rounded-[32px] bg-zinc-900/95 backdrop-blur-sm border border-zinc-800"
      style={{
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex flex-col gap-8">
        <p className="text-[22px] leading-relaxed text-white/90">
          "{quote}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#ACE580]/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-[#ACE580]">
              {author[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#ACE580]">{author}</span>
            <span className="text-sm text-zinc-400">{title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;