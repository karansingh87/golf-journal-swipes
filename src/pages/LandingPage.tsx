import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Flag, Trophy } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Improve Your Golf Game with Voice Notes
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Record your thoughts, analyze your performance, and track your progress on the course.
            The easiest way to document your golf journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-green-100 p-3">
                <Mic className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Voice Recording</h3>
              <p className="mt-2 text-gray-600">
                Quickly capture your thoughts and insights during or after your round
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-green-100 p-3">
                <Flag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Course Insights</h3>
              <p className="mt-2 text-gray-600">
                Track your performance and get AI-powered analysis of your game
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-green-100 p-3">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Progress Tracking</h3>
              <p className="mt-2 text-gray-600">
                Review your history and see how your game improves over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;