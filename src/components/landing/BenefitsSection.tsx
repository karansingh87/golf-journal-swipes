import { Headphones, Brain, Share2 } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Voice-First Experience */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="rounded-lg p-3 bg-zinc-50 inline-block group-hover:bg-zinc-100 transition-colors duration-300">
                <Headphones className="h-6 w-6 text-zinc-900" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-zinc-900">Voice-First Experience</h3>
              <p className="mt-4 text-zinc-600 leading-7">
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
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-2.5 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI-Powered Insights */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="rounded-lg p-3 bg-zinc-50 inline-block group-hover:bg-zinc-100 transition-colors duration-300">
                <Brain className="h-6 w-6 text-zinc-900" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-zinc-900">AI-Powered Insights</h3>
              <p className="mt-4 text-zinc-600 leading-7">
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
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-2.5 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Share & Connect */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="rounded-lg p-3 bg-zinc-50 inline-block group-hover:bg-zinc-100 transition-colors duration-300">
                <Share2 className="h-6 w-6 text-zinc-900" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-zinc-900">Share & Connect</h3>
              <p className="mt-4 text-zinc-600 leading-7">
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
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-2.5 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-sm text-zinc-600">{feature}</span>
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

export default BenefitsSection;