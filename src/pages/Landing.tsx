import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight text-golf-green sm:text-7xl">
              Elevate Your Golf Game
            </h1>
            <p className="mt-6 text-lg leading-8 text-golf-gray-text-secondary">
              Record, analyze, and improve your golf practice sessions with AI-powered insights. Track your progress and identify patterns to take your game to the next level.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                onClick={() => navigate("/login")}
                className="rounded-md bg-golf-green px-8 py-6 text-lg font-semibold text-white shadow-sm hover:bg-golf-muted transition-colors"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-golf-gray-text-hint">
              Improve Faster
            </h2>
            <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-golf-green sm:text-4xl">
              Everything you need to master your golf practice
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="font-serif text-xl font-semibold leading-7 text-golf-green">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-golf-gray-text-secondary">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: 'Voice Recording',
    description: 'Record your practice sessions with ease. Capture your thoughts, feelings, and observations in real-time.',
  },
  {
    name: 'AI Analysis',
    description: 'Get instant AI-powered analysis of your practice sessions. Identify patterns and areas for improvement.',
  },
  {
    name: 'Progress Tracking',
    description: 'Track your progress over time. See how your game improves and identify trends in your performance.',
  },
];

export default Landing;