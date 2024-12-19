import { Brain, LineChart, Mic, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
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

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-16 card-shadow">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-16">
              <div className="bg-white px-6 py-2 rounded-full shadow-sm">
                <h2 className="text-sm font-semibold text-zinc-900 font-jakarta">How it works</h2>
              </div>
            </div>

            <div className="space-y-20">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ACE580] to-[#F2FCE2] text-zinc-900 flex items-center justify-center shadow-lg">
                    <feature.Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 font-jakarta">{feature.title}</h3>
                  <p className="text-zinc-600 text-lg max-w-md leading-relaxed font-jakarta">
                    {feature.description}
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

export default FeaturesSection;