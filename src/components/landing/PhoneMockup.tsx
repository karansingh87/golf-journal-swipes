import { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

interface ScreenshotData {
  image: string;
  title: string;
}

const screenshots: ScreenshotData[] = [
  {
    image: "/lovable-uploads/d75e7e2a-4100-41cd-90cd-5e2ea644687f.png",
    title: "Hit record and talk,\nlike debriefing with a coach.",
  },
  {
    image: "/lovable-uploads/73567fa8-3d34-40dd-a79a-a6ac36b56dbf.png",
    title: "Thoughts turn to text instantly.",
  },
  {
    image: "/lovable-uploads/aa8bdac0-6f57-40f6-97b9-71c98224487c.png",
    title: "AI turns thoughts into insights.",
  },
  {
    image: "/lovable-uploads/a7b1dcf1-33e5-490f-8346-7e1538067798.png",
    title: "Spot patterns, trends, progress.",
  },
  {
    image: "/lovable-uploads/c9ec0f74-9bfa-441b-811a-b00e987b0d4f.png",
    title: "Build a playbook that remembers.",
  }
];

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = screenshots.map((screenshot) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = screenshot.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const updateSection = () => {
      const viewportHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      const sectionIndex = Math.min(
        Math.floor(currentScroll / viewportHeight),
        screenshots.length - 1
      );
      
      if (sectionIndex !== displayedIndex && sectionIndex >= 0) {
        setDisplayedIndex(sectionIndex);
      }
    };

    window.addEventListener('scroll', updateSection);
    return () => window.removeEventListener('scroll', updateSection);
  }, [displayedIndex]);

  if (!imagesLoaded) {
    return (
      <div className="min-h-[500vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-golf-gray-text-primary"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-[500vh]"
      aria-label="App screenshots showcase"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 1,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          className="container px-4 mx-auto"
        >
          <div className="w-full max-w-[320px] mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative w-[240px] aspect-[9/19] mx-auto mb-8">
                {/* Progress Dots */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {screenshots.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
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
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                  >
                    <img
                      src={screenshots[displayedIndex].image}
                      alt={screenshots[displayedIndex].title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p 
                  key={screenshots[displayedIndex].title}
                  className="font-[600] text-lg text-center text-golf-gray-text-primary max-w-[280px] min-h-[60px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -10,
                    transition: {
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }
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