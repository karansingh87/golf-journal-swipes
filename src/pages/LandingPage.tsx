import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, MessageSquare, Target, Flag } from "lucide-react";
import P5Background from "@/components/landing/P5Background";
import FeatureCard from "@/components/landing/FeatureCard";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <P5Background />
      
      {/* App Name */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 p-6 z-10 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-zinc-900">
          <Flag className="w-6 h-6" />
          <span>GolfLog.ai</span>
        </div>
      </motion.div>
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-24 text-center lg:pt-40 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl mb-8 lg:mb-10">
            Unlock Your Golf Insights
          </h1>
          <p className="mt-6 text-xl text-zinc-600 max-w-3xl mx-auto">
            Capture your post-round thoughts, analyze your game, and watch your progress soar.
          </p>
          <motion.div 
            className="mt-12 lg:mt-16 flex flex-col items-center space-y-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg shadow-lg"
            >
              Start Your Golf Journal
            </Button>
            <span className="text-sm text-zinc-500">
              As easy as talking about your round
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Social Proof Section */}
      <motion.section 
        className="py-20 lg:py-28 bg-zinc-50"
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

      {/* Usage Scenarios Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Perfect For Every Golf Moment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                className="bg-zinc-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <scenario.icon className="w-6 h-6 text-zinc-900" />
                  <h3 className="text-xl font-medium">{scenario.title}</h3>
                </div>
                <p className="text-zinc-600">{scenario.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Benefits Section */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why Golfers Love Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <FeatureCard
              index={0}
              title="Quick Capture"
              description="Record insights instantly, anywhere"
              Icon={Mic}
            />
            <FeatureCard
              index={1}
              title="Smart Analysis"
              description="AI-powered game improvement"
              Icon={Brain}
            />
            <FeatureCard
              index={2}
              title="Track Progress"
              description="See your journey clearly"
              Icon={LineChart}
            />
            <FeatureCard
              index={3}
              title="Easy Review"
              description="Find past insights quickly"
              Icon={MessageSquare}
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 lg:py-32 bg-white">
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