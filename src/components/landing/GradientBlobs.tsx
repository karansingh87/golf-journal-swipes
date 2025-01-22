import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const GradientBlobs = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (blobRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        blobRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={blobRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full 
                   bg-gradient-to-br from-emerald-100/30 to-emerald-200/30 
                   blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: ["60% 40% 30% 70%", "30% 60% 70% 40%", "60% 40% 30% 70%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[35rem] h-[35rem] rounded-full 
                   bg-gradient-to-br from-emerald-100/20 to-emerald-200/20 
                   blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          borderRadius: ["50% 60% 70% 30%", "80% 40% 50% 60%", "50% 60% 70% 30%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full 
                   bg-gradient-to-br from-emerald-100/25 to-emerald-200/25 
                   blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </div>
  );
};

export default GradientBlobs;