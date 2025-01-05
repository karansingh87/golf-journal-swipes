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
        className="mx-auto max-w-[300px] relative"
      >
        {/* iPhone Frame */}
        <div className="relative mx-auto rounded-[3rem] border-[14px] border-black bg-black shadow-xl">
          {/* Screen Content */}
          <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19.5]">
            <img
              src="/lovable-uploads/39e5d958-bcef-459c-985e-6847af214c0d.png"
              alt="GolfLog App Interface"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          
          {/* Dynamic Island */}
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <div className="w-[120px] h-[35px] bg-black rounded-b-3xl"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 blur-3xl opacity-20 -inset-x-20 -top-20 -bottom-20 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;