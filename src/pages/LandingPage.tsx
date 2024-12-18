import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, MessageSquare, Target, Flag } from "lucide-react";
import FeatureCard from "@/components/landing/FeatureCard";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf9]">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-24 lg:pt-40 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-white"
            >
              <Mic size={40} />
            </motion.div>
            
            <h1 className="text-[2.25rem] sm:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Turn Golf Thoughts into Insights
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
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2 text-base rounded-full shadow-md font-medium"
              >
                Start Your Golf Log
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-24 bg-[#F2FCE2]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="bg-white px-8 py-2 rounded-full shadow-card-light">
              <h2 className="text-lg font-medium text-zinc-900">How It Works</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                <div className="w-16 h-16 rounded-full bg-white shadow-card-light flex items-center justify-center">
                  <step.Icon className="w-8 h-8 text-zinc-900" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1F2C]">{step.title}</h3>
                <p className="text-[#8E9196] max-w-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="bg-white px-8 py-2 rounded-full shadow-card-light">
              <h2 className="text-lg font-medium text-zinc-900">Features</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              index={0}
              title="Voice-First Capture"
              description="Record your thoughts naturally, just like talking to your coach. No typing needed - your voice is all it takes."
              Icon={Mic}
            />
            <FeatureCard
              index={1}
              title="Personal Golf Journey"
              description="Build your roadmap to better golf. Track breakthroughs, lessons learned, and progress over time."
              Icon={LineChart}
            />
            <FeatureCard
              index={2}
              title="AI-Powered Analysis"
              description="Turn your thoughts into actionable insights. Our AI helps spot patterns and improvement opportunities."
              Icon={Brain}
            />
          </div>
        </div>
      </section>
      
      <motion.section 
        className="py-20 lg:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl font-medium text-zinc-900 italic">
            "Finally, an app that gets how golfers actually think and talk about their game."
          </blockquote>
          <p className="mt-6 text-zinc-600">- Professional Golf Coach</p>
        </div>
      </motion.section>
      
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold mb-8">Start Your Golf Journey</h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg shadow-lg"
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