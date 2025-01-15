import { motion } from "framer-motion";
import { MorphingText } from "@/components/ui/morphing-text";

const AnimatedTitle = () => {
  const animatedWords = [
    "spoken.",
    "recorded.",
    "organized.",
    "analyzed.",
    "unlocked.",
  ];

  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="font-poppins text-3xl sm:text-4xl md:text-5xl tracking-tight text-zinc-900 max-w-4xl mx-auto"
    >
      Your best golf insights,
      <br />
      <div className="h-[1.5em] relative flex items-center justify-center">
        <MorphingText 
          texts={animatedWords}
          className="text-[1em] font-[600] h-[1.5em]"
        />
      </div>
    </motion.h1>
  );
};

export default AnimatedTitle;