import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface ScreenshotData {
  image: string;
  title: string;
}

const screenshots: ScreenshotData[] = [
  {
    image: "/lovable-uploads/18cfc506-b67d-485f-93cd-f8bbfbf62128.png",
    title: "Press record and talk.",
  },
  {
    image: "/lovable-uploads/d11356f6-f7f5-4bbb-a95a-2c79e28caaa3.png",
    title: "Watch your thoughts turn to text.",
  },
  {
    image: "/lovable-uploads/173e1123-4a0a-4566-a059-8bd0d36a1b0b.png",
    title: "Your story comes together.",
  },
  {
    image: "/lovable-uploads/46fbee11-ffd8-4aa1-aa27-a6cd0cdd515f.png",
    title: "Get mindset and breakthrough insights.",
  },
  {
    image: "/lovable-uploads/0ffb7065-6622-4b6d-8945-9c03333d7f97.png",
    title: "Discover your winning patterns.",
  }
];

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Adjusted to give even more scroll time per screenshot
  const adjustedProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, screenshots.length - 1]);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = adjustedProgress.on("change", (latest) => {
      const newIndex = Math.round(latest);
      if (newIndex !== displayedIndex) {
        setPreviousIndex(displayedIndex);
        setDisplayedIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [adjustedProgress, displayedIndex]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[400vh] py-12"
      aria-label="App screenshots showcase"
    >
      <div className="sticky top-[20vh] h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="container px-4 mx-auto"
        >
          <div className="w-full max-w-[320px] mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-[275px] aspect-[9/19] mx-auto">
                {/* Progress Dots */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {screenshots.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        index === displayedIndex
                          ? "bg-golf-gray-light"
                          : "bg-golf-gray-light/30"
                      }`}
                    />
                  ))}
                </div>
                
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={screenshots[displayedIndex].image}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <img
                      src={screenshots[displayedIndex].image}
                      alt={screenshots[displayedIndex].title}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p 
                  key={screenshots[displayedIndex].title}
                  className="font-[600] text-lg text-center text-golf-gray-text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {screenshots[displayedIndex].title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneMockup;