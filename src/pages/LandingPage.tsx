import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/landing/TestimonialCard";
import BenefitsSection from "@/components/landing/BenefitsSection";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf9]">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-24 lg:pt-36 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ACE580]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#ACE580]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center justify-center space-y-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-20 h-20"
            >
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-[#ACE580]/20 rounded-full animate-pulse-ring" />
              
              {/* Main circle with icon */}
              <div className="absolute inset-0 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-lg">
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
            
            <h1 className="text-[2.5rem] sm:text-7xl font-extrabold tracking-tight gradient-text leading-tight">
              Turn Golf Thoughts <br className="hidden sm:block" />into Insights
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 mt-4 max-w-2xl mx-auto font-normal">
              From range breakthroughs to on-course discoveries, every insight counts. Just talk, and let AI reveal the patterns in your game.
            </p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => navigate("/login")}
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Start Your Golf Log
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-[#F2FCE2]/80 to-transparent rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-16">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md">
                  <h2 className="text-sm font-medium text-zinc-900">How it works</h2>
                </div>
              </div>

              <div className="space-y-20">
                {[
                  {
                    title: "Record Your Thoughts",
                    description: "Just tap record and talk about your game - at the range or after your round. No typing needed.",
                    Icon: Mic
                  },
                  {
                    title: "Get Smart Insights",
                    description: "AI analyzes your thoughts and organizes them into actionable insights about your game.",
                    Icon: Brain
                  },
                  {
                    title: "Track Your Progress",
                    description: "Review your journey, spot patterns, and build on what works for your game.",
                    Icon: LineChart
                  },
                  {
                    title: "Share Your Journey",
                    description: "Keep your coach or golf buddies in the loop with shareable insights.",
                    Icon: Share2
                  }
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                      <step.Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">{step.title}</h3>
                    <p className="text-zinc-600 text-lg max-w-md leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.section 
        className="py-20 lg:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <TestimonialCard
              quote="It's like having a golf coach who remembers everything you've ever discussed."
              author="Mark S."
              title="12 Handicap"
            />
            <TestimonialCard
              quote="Found swing changes I made 3 months ago that I'd completely forgotten about. Game-changer."
              author="Sarah T."
              title="Scratch Golfer"
            />
            <TestimonialCard
              quote="Love how it captures my thoughts right after a round. The AI finds patterns I never would have noticed myself."
              author="Jordan M."
              title="Club Champion"
            />
          </div>
        </div>
      </motion.section>

      <BenefitsSection />

      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2FCE2]/50 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold gradient-text mb-8">Start Your Golf Journey</h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-12 py-7 text-xl rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  Start Your Golf Log
                </Button>
              </motion.div>
              <span className="text-sm text-zinc-500 mt-4">
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