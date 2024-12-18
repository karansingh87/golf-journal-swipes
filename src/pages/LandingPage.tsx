import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-24 lg:pt-28 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white"
            >
              <Mic size={32} />
            </motion.div>
            
            <h1 className="text-[2rem] sm:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
              Turn Golf Thoughts into Insights
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 mt-4 max-w-2xl mx-auto font-normal leading-relaxed">
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
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
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
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <step.Icon size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900">{step.title}</h3>
                <p className="text-zinc-600 text-base max-w-md leading-relaxed">
                  {step.description}
                </p>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl font-medium text-zinc-900">
            "Finally, an app that gets how golfers actually think and talk about their game."
          </blockquote>
          <p className="mt-6 text-zinc-600">- Professional Golf Coach</p>
        </div>
      </motion.section>
      
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-zinc-900">Start Your Golf Journey</h2>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg shadow-lg rounded-full"
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