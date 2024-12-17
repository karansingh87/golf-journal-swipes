import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, LineChart, MessageSquare } from "lucide-react";
import P5Background from "@/components/landing/P5Background";
import FeatureCard from "@/components/landing/FeatureCard";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <P5Background />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-center lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl mb-6">
            Turn Post-Round Thoughts Into Game-Changing Insights
          </h1>
          <p className="mt-6 text-xl text-zinc-600 max-w-3xl mx-auto">
            Every golfer has that moment after a round - analyzing shots, sharing breakthroughs, 
            planning improvements. Capture those valuable insights when they matter most.
          </p>
          <div className="mt-10 flex flex-col items-center space-y-2">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Capture Insights In The Moment"
              description="Just like calling your coach or texting your buddy after a round. Simply open GolfLog.ai and talk through your thoughts while they're fresh. No typing needed - your voice is all it takes."
              Icon={Mic}
            />
            <FeatureCard
              title="Your Personal Golf Journey"
              description="Every round has a story. Every breakthrough deserves to be remembered. From parking lot revelations to practice session discoveries, build your personal roadmap to better golf."
              Icon={MessageSquare}
            />
            <FeatureCard
              title="AI-Powered Analysis"
              description="Watch patterns emerge. See your game evolve. Our AI helps you spot trends and turn random thoughts into actionable insights."
              Icon={Brain}
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl font-medium text-zinc-900 italic">
            "Finally, an app that gets how golfers actually think and talk about their game."
          </blockquote>
          <p className="mt-4 text-zinc-600">- Professional Golf Coach</p>
        </div>
      </section>

      {/* Usage Scenarios Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For Every Golf Moment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Post-round reflections",
              "Swing breakthrough moments",
              "Practice session insights",
              "Pre-lesson notes"
            ].map((scenario) => (
              <div key={scenario} className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">{scenario}</h3>
                <p className="text-zinc-600">
                  Capture your thoughts and insights whenever inspiration strikes.
                </p>
              </div>
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
              title="Voice-First Design"
              description="Capture thoughts naturally, just like talking to your coach"
              Icon={Mic}
            />
            <FeatureCard
              title="Smart Organization"
              description="Find past thoughts easily with intelligent categorization"
              Icon={Brain}
            />
            <FeatureCard
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
          <h2 className="text-3xl font-bold mb-6">Start Your Golf Journey Today</h2>
          <p className="text-xl text-zinc-600 mb-10">
            Join thousands of golfers who are turning their post-round thoughts into lasting improvement.
          </p>
          <div className="flex flex-col items-center space-y-2">
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg"
            >
              Begin Your Free Trial
            </Button>
            <span className="text-sm text-zinc-500">
              Your next round could be your best round
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;