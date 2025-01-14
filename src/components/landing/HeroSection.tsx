import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface HeroSectionProps {
  content?: {
    title: string;
    subtitle: string;
  };
}

const HeroSection = ({ content }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  // Animation words state
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(
    () => ["spoken", "recorded", "analyzed", "organized", "transformed"],
    []
  );

  // Word rotation effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWordIndex((current) => (current === words.length - 1 ? 0 : current + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [wordIndex, words]);
  
  return (
    <div className="relative pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-12 flex flex-col items-center text-center">
          {/* Animated Mic Icon */}
          <div className="mb-8 relative">
            <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="289.02652413026095"
                  strokeDashoffset="216.76989309769572"
                  style={{
                    filter: 'drop-shadow(0 0 2px #18181B)',
                  }}
                />
              </svg>
            </div>
            <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950"></div>
              <Mic className="w-12 h-12 text-white relative z-10" />
            </div>
          </div>
          
          <h1 className="font-poppins font-[400] text-3xl sm:text-4xl md:text-5xl tracking-tight text-zinc-900 max-w-4xl mx-auto">
            Your best golf insights,
            <br />
            <span className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center">
                <span className="relative inline-block h-[1.2em] w-[140px]">
                  {words.map((word, index) => (
                    <motion.span
                      key={word}
                      className="absolute left-0 right-0 font-[600]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: wordIndex === index ? 1 : 0,
                        y: wordIndex === index ? 0 : -20,
                      }}
                      transition={{
                        opacity: { duration: 0.2 },
                        y: { type: "spring", stiffness: 300, damping: 30 }
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="font-[400]">&nbsp;not lost.</span>
              </span>
            </span>
          </h1>
          
          <p className="mt-6 text-base leading-6 text-zinc-600 max-w-2xl mx-auto font-inter">
            Turn your post-round thoughts into your personal playbook for better golf. Just talk – we'll capture the genius
          </p>
          
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => navigate("/signup")}
              className="text-base px-6 py-2.5 h-auto bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group rounded-xl"
            >
              <span className="relative z-10">Start your GolfLog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;