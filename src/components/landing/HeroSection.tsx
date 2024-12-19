import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";

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
            <div className="absolute inset-0 bg-gradient-to-r from-[#ACE580]/30 to-[#D3E4FD]/30 rounded-full animate-pulse-ring" />
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#ACE580] to-[#D3E4FD] rounded-full flex items-center justify-center text-white shadow-lg">
              <Mic size={48} className="drop-shadow-xl" />
            </div>

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
                    filter: 'drop-shadow(0 0 2px rgba(172, 229, 128, 0.4))',
                  }}
                />
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-[2.5rem] sm:text-7xl font-extrabold tracking-tight leading-tight text-zinc-900">
            Turn Golf Thoughts into Insights
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            From range breakthroughs to on-course discoveries, every insight counts. Just talk, and let AI reveal the patterns in your game.
          </p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ACE580] to-[#D3E4FD] rounded-full blur-lg opacity-75" />
            <Button
              onClick={() => navigate("/login")}
              className="relative bg-gradient-to-r from-[#ACE580] to-[#D3E4FD] hover:from-[#9BD56B] hover:to-[#BED8F8] text-white px-8 py-6 text-lg rounded-full shadow-xl font-medium transition-all duration-300"
            >
              Start Your Golf Log
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;