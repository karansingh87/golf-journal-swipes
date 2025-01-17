import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();
  
  const scrollToMockups = () => {
    const mockupsSection = document.querySelector('[aria-label="App screenshots showcase"]');
    if (mockupsSection) {
      const offset = 50; // Small offset to scroll slightly further
      const elementPosition = mockupsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
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
        className="mt-6 text-base leading-7 text-zinc-600 max-w-2xl mx-auto font-sans tracking-[-0.01em]"
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
          className="text-sm font-medium px-6 py-3 h-auto bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="relative z-10">Start Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
        </Button>
        
        <Button
          variant="outline"
          onClick={scrollToMockups}
          className="text-sm font-medium px-6 py-3 h-auto border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Watch Demo
        </Button>
      </motion.div>
    </>
  );
};

export default HeroContent;