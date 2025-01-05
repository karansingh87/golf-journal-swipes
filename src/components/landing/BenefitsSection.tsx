import { Headphones, Brain, DollarSign } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="py-24 bg-zinc-50/80 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold text-center text-zinc-900 sm:text-4xl mb-16">
          The Smart, Fair, and Superior Way to Listen
        </h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Voice-First Experience Card */}
          <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover-card-animation">
            <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-100 rounded-xl animate-float">
              <Headphones className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900">Voice-First Experience</h3>
            <p className="mb-6 text-zinc-600">As Natural As Talking About Your Round: No more fumbling with note-taking apps or forgetting key insights.</p>
            <ul className="space-y-3">
              {[
                "Talk Like You're With Your Playing Partners",
                "Capture Thoughts Right After Your Round",
                "Works Great During Practice Sessions",
                "Perfect for Post-Round Reflections",
                "Share Stories With Your Coach",
                "No Audio Ads"
              ].map((item) => (
                <li key={item} className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Algorithm Card */}
          <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover-card-animation">
            <div className="flex items-center justify-center w-12 h-12 mb-6 bg-amber-100 rounded-xl animate-float" style={{ animationDelay: '0.2s' }}>
              <Brain className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900">Algorithm That Knows You</h3>
            <p className="mb-6 text-zinc-600">Our intelligent algorithm doesn't just suggest what's popular—it learns your unique tastes and evolves with you.</p>
            <ul className="space-y-3">
              {[
                "Behavioral Learning",
                "Mood-Based Playlists",
                "Deep Genre Exploration",
                "Smart Curation",
                "Contextual Recommendations",
                "Collaborative Filtering"
              ].map((item) => (
                <li key={item} className="flex items-center text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 mr-2 bg-zinc-300 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Fair Pay Card */}
          <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover-card-animation">
            <div className="flex items-center justify-center w-12 h-12 mb-6 bg-pink-100 rounded-xl animate-float" style={{ animationDelay: '0.4s' }}>
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900">Fair Pay to Artists</h3>
            <p className="mb-6 text-zinc-600">At Rhythmiq, we believe that great music deserves fair compensation. We've built our platform on the principle of fair pay.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;