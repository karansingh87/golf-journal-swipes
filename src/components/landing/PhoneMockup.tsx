import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const screens = [
  {
    id: 1,
    image: "/lovable-uploads/20b29773-caad-40f5-bd34-ce4892ca9b9a.png",
    alt: "Golf app analytics screen"
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

  const currentIndex = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[400px] mx-auto mt-32 px-6 h-[600px]">
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
                      index - 0.5 > 0 ? [index - 0.5, index, index + 0.5] : [0, index, index + 0.5],
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
  );
};

export default PhoneMockup;