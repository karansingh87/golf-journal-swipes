import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="mt-6 text-base md:text-lg leading-6 text-zinc-600 max-w-2xl mx-auto font-inter"
      >
        Turn your golf thoughts into a playbook for better golf. Just talk, we'll capture the genius.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="mt-10 flex justify-center gap-3"
      >
        <Button
          onClick={() => navigate("/signup")}
          className="text-sm font-medium w-32 h-12 bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300"
        >
          <span className="relative z-10">Start Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
        </Button>
        
        <Button
          variant="outline"
          className="text-sm font-medium w-32 h-12 border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300"
        >
          Watch Demo
        </Button>
      </motion.div>
    </>
  );
};

export default HeroContent;