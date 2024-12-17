import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, MessageSquare, Target, BookOpen } from "lucide-react";
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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl mb-6">
            Turn Post-Round Thoughts Into Game-Changing Insights
          </h1>
          <p className="mt-6 text-xl text-zinc-600 max-w-3xl mx-auto">
            Every golfer has that moment after a round - analyzing shots, sharing breakthroughs, 
            planning improvements. Capture those valuable insights when they matter most.
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
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              index={0}
              title="Capture Insights In The Moment"
              description="Just like calling your coach or texting your buddy after a round. Simply open GolfLog.ai and talk through your thoughts while they're fresh. No typing needed - your voice is all it takes."
              Icon={Mic}
            />
            <FeatureCard
              index={1}
              title="Your Personal Golf Journey"
              description="Every round has a story. Every breakthrough deserves to be remembered. From parking lot revelations to practice session discoveries, build your personal roadmap to better golf."
              Icon={MessageSquare}
            />
            <FeatureCard
              index={2}
              title="AI-Powered Analysis"
              description="Watch patterns emerge. See your game evolve. Our AI helps you spot trends and turn random thoughts into actionable insights."
              Icon={Brain}
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <motion.section 
        className="py-16 bg-zinc-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Post-round reflections", icon: MessageSquare },
              { title: "Swing breakthrough moments", icon: Target },
              { title: "Practice session insights", icon: LineChart },
              { title: "Pre-lesson notes", icon: BookOpen }
            ].map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 rounded-lg p-6"
              >
                <div className="flex items-center space-x-3">
                  <scenario.icon className="w-6 h-6 text-zinc-900" />
                  <h3 className="text-xl font-medium">{scenario.title}</h3>
                </div>
                <p className="mt-2 text-zinc-600">
                  Capture your thoughts and insights whenever inspiration strikes.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Golfers Love Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              index={0}
              title="Voice-First Design"
              description="Capture thoughts naturally, just like talking to your coach"
              Icon={Mic}
            />
            <FeatureCard
              index={1}
              title="Smart Organization"
              description="Find past thoughts easily with intelligent categorization"
              Icon={Brain}
            />
            <FeatureCard
              index={2}
              title="Progress Tracking"
              description="See your journey and track improvements over time"
              Icon={LineChart}
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Start Your Golf Journey Today</h2>
            <p className="text-xl text-zinc-600 mb-10">
              Join thousands of golfers who are turning their post-round thoughts into lasting improvement.
            </p>
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
                Your next round could be your best round
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;