import { motion } from "framer-motion";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HeroSection from "@/components/landing/HeroSection";
import P5Background from "@/components/landing/P5Background";
import { Mic, Brain, LineChart, Share2 } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <P5Background />
      <HeroSection />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-20">
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
      </section>

      <TestimonialsSection />

      <BenefitsSection />
    </div>
  );
};

export default LandingPage;
