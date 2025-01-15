import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

const AnimatedTitle = () => {
  const [wordIndex, setWordIndex] = useState(0);
  
  const animatedWords = useMemo(
    () => ["spoken.", "recorded.", "organized.", "analyzed.", "unlocked."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWordIndex((current) => 
        current === animatedWords.length - 1 ? 0 : current + 1
      );
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [wordIndex, animatedWords]);

  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="font-display text-4xl sm:text-6xl tracking-[-0.02em] text-zinc-900 max-w-4xl mx-auto"
    >
      <span className="font-medium">Your golf thoughts,</span>
      <br />
      <span className="relative flex items-center justify-center h-[1.5em] overflow-hidden">
        {animatedWords.map((word, index) => (
          <motion.span
            key={index}
            className="absolute font-extrabold"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: wordIndex === index ? 1 : 0,
              y: wordIndex === index ? 0 : -50
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 1
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
};

export default AnimatedTitle;