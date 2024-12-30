import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/landing/TestimonialCard";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BackgroundGlow from "@/components/landing/BackgroundGlow";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen landing-page">
      <BackgroundGlow />
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-24 lg:pt-36 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-20 h-20"
            >
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse-ring" />
              
              {/* Main circle with icon */}
              <div className="absolute inset-0 bg-[#ACE580] rounded-full flex items-center justify-center text-zinc-900 shadow-lg">
                <Mic size={40} />
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
            
            <div className="space-y-4">
              <h1 className="text-[2rem] sm:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                Turn <span className="font-normal">golf thoughts</span> into{' '}
                <span className="font-serif italic">insights</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 mt-6 max-w-2xl mx-auto font-normal">
                Just talk, and let AI reveal the patterns in your game.
              </p>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#ACE580] hover:bg-[#9BD56E] text-zinc-900 px-6 py-2 text-base rounded-full shadow-md font-medium"
              >
                Start Your Golf Log
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <HowItWorksSection />

      <div className="bg-zinc-900">
        <TestimonialsCarousel />
      </div>

      <BenefitsSection />

      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">Start Your Golf Journey</h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-[#ACE580] hover:bg-[#9BD56E] text-zinc-900 px-8 py-6 text-lg shadow-lg"
                >
                  Start Your Golf Log
                </Button>
              </motion.div>
              <span className="text-sm text-zinc-400">
                Your next round could be your best
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
