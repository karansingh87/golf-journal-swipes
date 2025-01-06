import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";

interface ScreenshotData {
  image: string;
  title: string;
}

const screenshots: ScreenshotData[] = [
  {
    image: "/lovable-uploads/5b5a8acd-ebd3-4b28-aa6f-e580187f2173.png",
    title: "Press record and talk",
  },
  {
    image: "/lovable-uploads/ff6ca37a-ddc1-42ff-a2ac-1199d6b7099b.png",
    title: "Watch your words flow live",
  },
  {
    image: "/lovable-uploads/bb2a5651-bb9d-4849-bcac-67aeecd2f025.png",
    title: "AI analyzes your golf mind",
  },
  {
    image: "/lovable-uploads/7c4e6f30-82be-4721-a3f9-a7b87858823a.png",
    title: "Uncover your deep insights",
  },
  {
    image: "/lovable-uploads/0ffb7065-6622-4b6d-8945-9c03333d7f97.png",
    title: "See patterns across time",
  }
];

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate which screenshot to show based on scroll progress
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, screenshots.length - 1]);
  
  const [displayedIndex, setDisplayedIndex] = useState(0);

  // Update the displayed index when scroll progress changes
  useEffect(() => {
    const unsubscribe = currentIndex.on("change", (latest) => {
      setDisplayedIndex(Math.round(latest));
    });
    return () => unsubscribe();
  }, [currentIndex]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] py-12"
      aria-label="App screenshots showcase"
    >
      <div className="sticky top-[20vh] h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="container px-4 mx-auto"
        >
          <div className="w-full max-w-[280px] mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <motion.div 
                className="relative w-[220px] aspect-[9/19] mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  key={screenshots[displayedIndex].image}
                  src={screenshots[displayedIndex].image}
                  alt={screenshots[displayedIndex].title}
                  className="object-cover w-full h-full rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
              </motion.div>
              <motion.p 
                key={screenshots[displayedIndex].title}
                className="font-poppins font-[400] text-base text-center text-golf-gray-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {screenshots[displayedIndex].title}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneMockup;
