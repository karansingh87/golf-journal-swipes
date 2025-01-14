import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const AnimatedMicIcon = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="mb-8 relative"
    >
      <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#18181B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="289.02652413026095"
            strokeDashoffset="216.76989309769572"
            style={{
              filter: 'drop-shadow(0 0 2px #18181B)',
            }}
          />
        </svg>
      </div>
      <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950"></div>
        <Mic className="w-12 h-12 text-white relative z-10" />
      </div>
    </motion.div>
  );
};

export default AnimatedMicIcon;