import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/landing/TestimonialCard";
import BenefitsSection from "@/components/landing/BenefitsSection";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf9] overflow-hidden">
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
              {/* Pulsing background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse-ring" />
              
              {/* Main circle with icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Mic size={48} className="drop-shadow-xl" />
              </div>

              {/* Rotating circle */}
              <div className="absolute inset-0 w-full h-full">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <circle
                    className="stroke-purple-400"
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '289.02652413026095',
                      strokeDashoffset: '28.902652413026095',
                      filter: 'drop-shadow(0 0 2px rgba(168, 85, 247, 0.4))',
                    }}
                  />
                </svg>
              </div>
            </motion.div>
            
            <h1 className="text-[2.5rem] sm:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75" />
              <Button
                onClick={() => navigate("/login")}
                className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-xl font-medium transition-all duration-300"
              >
                Start Your Golf Log
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -z-10" />
      </motion.section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-[#F2FCE2]/80 to-transparent rounded-2xl mx-4 sm:mx-8 lg:mx-16 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-16">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-xl">
                  <h2 className="text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">How it Works</h2>
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-xl">
                      <step.Icon className="w-8 h-8" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-pink-50/50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Start Your Golf Journey
            </h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75" />
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-xl"
                >
                  Start Your Golf Log
                </Button>
              </motion.div>
              <span className="text-sm text-zinc-500 font-medium">
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