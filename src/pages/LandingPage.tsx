import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, MessageSquare, Target } from "lucide-react";
import P5Background from "@/components/landing/P5Background";
import FeatureCard from "@/components/landing/FeatureCard";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <P5Background />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-20 pb-16 text-center lg:pt-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
              alt="Golf Course" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-xl"
            />
            <div className="relative z-10 py-20">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl mb-6">
                Unlock Your Golf Insights
              </h1>
              <p className="mt-6 text-xl text-zinc-600 max-w-3xl mx-auto">
                Capture your post-round thoughts, analyze your game, and watch your progress soar.
              </p>
              <motion.div 
                className="mt-10 flex flex-col items-center space-y-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg"
                >
                  Start Your Golf Journal
                </Button>
                <span className="text-sm text-zinc-500">
                  As easy as talking about your round
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              index={0}
              title="Voice-First Capture"
              description="Record your thoughts naturally, just like talking to your coach. No typing needed - your voice is all it takes."
              Icon={Mic}
              imageSrc="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
            />
            <FeatureCard
              index={1}
              title="Personal Golf Journey"
              description="Build your roadmap to better golf. Track breakthroughs, lessons learned, and progress over time."
              Icon={LineChart}
              imageSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            />
            <FeatureCard
              index={2}
              title="AI-Powered Analysis"
              description="Turn your thoughts into actionable insights. Our AI helps spot patterns and improvement opportunities."
              Icon={Brain}
              imageSrc="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <motion.section 
        className="py-16 bg-zinc-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <blockquote className="text-2xl font-medium text-zinc-900 italic">
            "Finally, an app that gets how golfers actually think and talk about their game."
          </blockquote>
          <p className="mt-4 text-zinc-600">- Professional Golf Coach</p>
        </div>
      </motion.section>

      {/* Usage Scenarios Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For Every Golf Moment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Post-Round Reflections", icon: MessageSquare, description: "Capture immediate thoughts after your round" },
              { title: "Practice Insights", icon: Target, description: "Track breakthroughs during practice sessions" },
              { title: "Progress Tracking", icon: LineChart, description: "Monitor your improvement over time" }
            ].map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <scenario.icon className="w-6 h-6 text-zinc-900" />
                    <h3 className="text-xl font-medium">{scenario.title}</h3>
                  </div>
                  <p className="text-zinc-600">{scenario.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Golf Course"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Start Your Golf Journey</h2>
            <div className="flex flex-col items-center space-y-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg"
                >
                  Begin Your Free Trial
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