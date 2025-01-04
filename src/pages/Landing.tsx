import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-black rounded-2xl mx-auto flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 text-white"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Turn Your Golf Talk Into Insights
          </h1>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">The Smart, Fast, and Superior Way to Listen</h2>
            <ul className="space-y-3 text-zinc-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <span>Record your golf thoughts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <span>Get instant analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <span>Track your progress</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <span>Improve your game</span>
              </li>
            </ul>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Our Plan</h2>
            <div className="bg-zinc-50 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">Trial Access</h3>
                <div className="text-2xl font-bold">$19</div>
              </div>
              <ul className="space-y-3 text-zinc-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>Unlimited recordings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>AI-powered analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>Progress tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>7-day money back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button 
            className="w-full py-6 text-base bg-black hover:bg-zinc-800"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            className="w-full py-6 text-base border-zinc-200"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Common Questions</h2>
          <div className="space-y-6 text-zinc-600">
            <div className="space-y-2">
              <h3 className="font-medium">How many recordings can I make?</h3>
              <p className="text-sm">You can make unlimited recordings during your trial period.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Can I cancel my subscription?</h3>
              <p className="text-sm">Yes, you can cancel anytime during your trial period.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">What if I'm not satisfied?</h3>
              <p className="text-sm">We offer a 7-day money-back guarantee if you're not completely satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;