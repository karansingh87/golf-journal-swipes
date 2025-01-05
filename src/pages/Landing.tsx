import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Headphones, Brain, DollarSign } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 pt-32 pb-16 mx-auto max-w-7xl sm:pt-40 sm:pb-24">
        <div className="text-center">
          {/* App Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 overflow-hidden rounded-2xl bg-zinc-900">
              <img 
                src="/lovable-uploads/4e485704-bf8e-40e2-89b0-7e45e27dde72.png" 
                alt="GolfLog Icon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="max-w-4xl mx-auto text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Turn Your Golf Talk Into Insights
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-zinc-600">
            Stop losing valuable insights after your round. Just talk about your game like you always do, and let AI reveal patterns in your game
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 mt-10 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={() => navigate("/record")}
              size="lg"
              className="text-base font-medium bg-blue-600 hover:bg-blue-700"
            >
              Start your GolfLog
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/login")}
              className="text-base font-medium border-zinc-200"
            >
              See how it works
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-zinc-50">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-center text-zinc-900 sm:text-4xl mb-16">
            The Smart, Fair, and Superior Way to Listen
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Voice-First Experience Card */}
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-100 rounded-xl">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900">Voice-First Experience</h3>
              <p className="mb-6 text-zinc-600">As Natural As Talking About Your Round: No more fumbling with note-taking apps or forgetting key insights.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Talk Like You're With Your Playing Partners
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Capture Thoughts Right After Your Round
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Works Great During Practice Sessions
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Perfect for Post-Round Reflections
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Share Stories With Your Coach
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  No Audio Ads
                </li>
              </ul>
            </div>

            {/* Algorithm Card */}
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-amber-100 rounded-xl">
                <Brain className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900">Algorithm That Knows You</h3>
              <p className="mb-6 text-zinc-600">Our intelligent algorithm doesn't just suggest what's popular—it learns your unique tastes and evolves with you.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Behavioral Learning
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Mood-Based Playlists
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Deep Genre Exploration
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Smart Curation
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Contextual Recommendations
                </li>
                <li className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  Collaborative Filtering
                </li>
              </ul>
            </div>

            {/* Fair Pay Card */}
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-6 bg-pink-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900">Fair Pay to Artists</h3>
              <p className="mb-6 text-zinc-600">At Rhythmiq, we believe that great music deserves fair compensation. We've built our platform on the principle of fair pay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;