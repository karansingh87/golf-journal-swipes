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
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <div 
        className="relative group rounded-3xl bg-zinc-900 border border-zinc-800/50 p-6 md:p-8 hover:border-[#ACE580]/20 transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-[#ACE580]/5 rounded-3xl blur-2xl group-hover:bg-[#ACE580]/10 transition-all duration-500" />
        <div className="relative flex flex-col gap-6">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-white/90">
            "{quote}"
          </p>
          
          <div className="flex items-center gap-4">
            {image && (
              <div className="relative">
                <div className="absolute inset-0 bg-[#ACE580]/15 rounded-full blur-lg" />
                <img 
                  src={image} 
                  alt={author}
                  className="relative w-10 h-10 rounded-full object-cover border-2 border-zinc-700/50"
                />
              </div>
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