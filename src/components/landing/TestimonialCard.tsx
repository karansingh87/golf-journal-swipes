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
      className="relative h-full p-8 rounded-[32px] bg-zinc-900/95 backdrop-blur-sm border border-zinc-800"
    >
      <div className="flex flex-col justify-between h-full gap-8">
        <p className="text-xl font-medium leading-relaxed text-white/90">
          "{quote}"
        </p>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-white">{author}</span>
          <span className="text-sm text-white/60">{title}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;