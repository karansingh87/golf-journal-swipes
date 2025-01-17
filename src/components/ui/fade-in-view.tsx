"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
}

export const FadeInView = ({ children, className }: FadeInViewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-20% 0px" // Adjusted to trigger animation earlier
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }} // Increased initial offset
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.8, // Increased duration
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 // Added slight delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};