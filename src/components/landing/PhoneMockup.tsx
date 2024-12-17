import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const screens = [
  {
    id: 1,
    image: "/lovable-uploads/6e27a5bc-120a-4369-aa38-a4d62af73c6a.png",
    alt: "Golf app recording interface"
  },
  {
    id: 2,
    image: "/placeholder.svg",
    alt: "Golf app recording screen"
  },
  {
    id: 3,
    image: "/placeholder.svg",
    alt: "Golf app insights screen"
  }
];

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Adjusted the transform values to make the first image stay longer
  const currentIndex = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 2]);

  return (
    <div className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={containerRef} className="relative w-full max-w-[400px] mx-auto px-6">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-[280px]">
              {/* Phone Frame */}
              <div className="relative rounded-[50px] bg-black p-3 shadow-2xl">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-20" />
                
                {/* Screen Content */}
                <div className="relative rounded-[40px] overflow-hidden bg-white aspect-[9/19.5]">
                  {screens.map((screen, index) => (
                    <motion.div
                      key={screen.id}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        opacity: useTransform(
                          currentIndex,
                          // Adjusted the transition points to create a longer display duration
                          index - 0.3 > 0 ? [index - 0.3, index, index + 0.3] : [0, index, index + 0.3],
                          [0, 1, 0]
                        )
                      }}
                    >
                      <img 
                        src={screen.image}
                        alt={screen.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;