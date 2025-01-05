import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const PhoneMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div className="relative py-24 overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }
        }}
        className="mx-auto max-w-[800px] px-12 sm:px-24 md:px-32 relative"
      >
        <img
          src="/lovable-uploads/f9bfd946-1214-4ba6-b7aa-496cfd3cca3f.png"
          alt="GolfLog App Interface"
          className="w-full h-auto"
        />
        
        {/* Decorative Elements */}
        <div className="absolute -z-10 blur-3xl opacity-20 -inset-x-20 -top-20 -bottom-20 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;