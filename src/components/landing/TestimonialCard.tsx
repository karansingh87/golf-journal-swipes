import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title?: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, title, image }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl mx-auto px-4 py-8"
    >
      <div className="relative rounded-3xl bg-zinc-900/50 backdrop-blur-sm p-8 md:p-10">
        {/* Star Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 fill-[#ACE580] text-[#ACE580]" 
            />
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-white/90 mb-8">
          "{quote}"
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-4">
          {image && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800">
              <img 
                src={image} 
                alt={author}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              {author}
            </span>
            {title && (
              <span className="text-sm text-zinc-400">
                {title}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;