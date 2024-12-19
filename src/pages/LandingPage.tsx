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
        className="pt-32 pb-24 lg:pt-36 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative hero-gradient rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-20 h-20 animate-float"
              >
                <div className="absolute inset-0 bg-zinc-900/10 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                  <Mic className="w-10 h-10" />
                </div>
              </motion.div>
              
              <h1 className="text-[2.5rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
                Turn Golf Thoughts 
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"> into Insights</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-600 mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
                From range breakthroughs to on-course discoveries, every insight counts. 
                Just talk, and let AI reveal the patterns in your game.
              </p>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg rounded-full shadow-lg font-medium transition-all duration-200 ease-in-out"
                >
                  Start Your Golf Log
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-zinc-900"
            >
              How It Works
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="feature-card-gradient p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                    <feature.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">{feature.title}</h3>
                  <p className="text-zinc-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
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

      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-8">
              Start Your Golf Journey
            </h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg shadow-lg rounded-full transition-all duration-200"
                >
                  Start Your Golf Log
                </Button>
              </motion.div>
              <span className="text-sm text-zinc-500">
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