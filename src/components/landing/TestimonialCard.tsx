import { motion } from "framer-motion";

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
      className="w-full max-w-2xl mx-auto px-6 py-12"
    >
      <div 
        className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-8 md:p-12"
        style={{
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="flex flex-col gap-8">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-white/90">
            "{quote}"
          </p>
          
          <div className="flex items-center gap-4">
            {image && (
              <img 
                src={image} 
                alt={author}
                className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700/50"
              />
            )}
            <div className="flex flex-col">
              <span className="text-lg font-semibold bg-gradient-to-r from-[#98EC65] to-[#5BED9E] bg-clip-text text-transparent">
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
      </div>
    </motion.div>
  );
};

export default TestimonialCard;