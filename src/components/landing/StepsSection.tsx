import { motion } from "framer-motion";
import { Mic, Brain, LineChart, Share2 } from "lucide-react";

const steps = [
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
];

const StepsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#F2FCE2]/80 to-transparent rounded-2xl mx-4 sm:mx-8 lg:mx-16 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-16">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-xl">
                <h2 className="text-base font-semibold text-[#403E43]">How it Works</h2>
              </div>
            </div>

            <div className="space-y-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ACE580] to-[#D3E4FD] text-white flex items-center justify-center shadow-xl">
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
  );
};

export default StepsSection;