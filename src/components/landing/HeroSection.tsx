import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative pt-32 pb-24 lg:pt-36 px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24"
          >
            {/* Pulsing background */}
            <div className="absolute inset-0 bg-[#ACE580]/20 rounded-full animate-pulse-ring" />
            
            {/* Main circle with icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ACE580] to-[#F2FCE2] rounded-full flex items-center justify-center text-white shadow-lg">
              <Mic size={48} />
            </div>

            {/* Rotating circle */}
            <div className="absolute inset-0 w-full h-full">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  className="stroke-[#ACE580]"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '289.02652413026095',
                    strokeDashoffset: '28.902652413026095',
                    filter: 'drop-shadow(0 0 2px #ACE580)',
                  }}
                />
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-[2.5rem] sm:text-7xl font-extrabold tracking-tight text-zinc-900 leading-tight font-jakarta">
            Turn Golf Thoughts into{' '}
            <span className="bg-gradient-to-r from-[#ACE580] to-[#F2FCE2] bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 mt-4 max-w-2xl mx-auto font-medium font-jakarta">
            From range breakthroughs to on-course discoveries, every insight counts. Just talk, and let AI reveal the patterns in your game.
          </p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-4"
          >
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#ACE580] to-[#F2FCE2] hover:opacity-90 text-zinc-900 px-8 py-6 text-lg rounded-full shadow-lg font-medium group"
            >
              Start Your Golf Log
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;