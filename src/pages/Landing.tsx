import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Headphones, Brain, Share2 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Grid Background - Now positioned fixed to persist across the page */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-14 backdrop-blur-sm border-b border-zinc-800/10 bg-white/80">
        <div className="h-full px-6 flex justify-between items-center">
          <div className="text-2xl font-logo tracking-[-0.03em] cursor-pointer hover:opacity-90 transition-opacity flex items-center">
            <span 
              className="flex items-center text-zinc-900"
              style={{
                WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.08)',
              }}
            >
              golflog
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="font-medium"
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated Mic Icon */}
            <div className="mb-8 relative">
              <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#18181B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="289.02652413026095"
                    strokeDashoffset="216.76989309769572"
                    style={{
                      filter: 'drop-shadow(0 0 2px #18181B)',
                    }}
                  />
                </svg>
              </div>
              <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center">
                <Mic className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 max-w-4xl mx-auto">
              Turn Your Golf Talk Into Insights
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Stop losing valuable insights after your round. Just talk about your game like you always do, and let AI reveal patterns in your game
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                onClick={() => navigate("/signup")}
                className="text-base sm:text-lg px-8 py-6 h-auto bg-[#4169E1] hover:bg-[#3154b3]"
              >
                Start your GolfLog
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/demo")}
                className="text-base sm:text-lg px-8 py-6 h-auto"
              >
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-3">
            {/* Voice-First Experience */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="rounded-lg p-3 bg-[#F1F0FB] inline-block">
                <Headphones className="h-6 w-6 text-[#4169E1]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Voice-First Experience</h3>
              <p className="mt-4 text-gray-600 leading-7">
                As Natural As Talking About Your Round: No more fumbling with note-taking apps or forgetting key insights.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Talk Like You're With Your Playing Partners",
                  "Capture Thoughts Right After Your Round",
                  "Works Great During Practice Sessions",
                  "Perfect for Post-Round Reflections",
                  "Share Stories With Your Coach",
                  "No Audio Ads"
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#4169E1] mt-2.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI-Powered Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="rounded-lg p-3 bg-[#F1F0FB] inline-block">
                <Brain className="h-6 w-6 text-[#4169E1]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">AI-Powered Insights</h3>
              <p className="mt-4 text-gray-600 leading-7">
                Our intelligent AI doesn't just transcribe—it learns your unique playing style and evolves with you, providing personalized insights that matter.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Pattern Recognition",
                  "Personalized Recommendations",
                  "Performance Tracking",
                  "Skill Development Focus",
                  "Game Improvement Tips",
                  "Mental Game Analysis"
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#4169E1] mt-2.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share & Connect */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="rounded-lg p-3 bg-[#F1F0FB] inline-block">
                <Share2 className="h-6 w-6 text-[#4169E1]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Share & Connect</h3>
              <p className="mt-4 text-gray-600 leading-7">
                Share your progress with coaches, track improvements over time, and build a comprehensive record of your golf journey.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Coach Collaboration",
                  "Progress Tracking",
                  "Round History",
                  "Easy Sharing",
                  "Secure Storage",
                  "Data Insights"
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#4169E1] mt-2.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;