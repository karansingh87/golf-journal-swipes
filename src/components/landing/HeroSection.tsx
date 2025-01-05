import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-32 pb-16 mx-auto max-w-7xl sm:pt-40 sm:pb-24">
      <div className="text-center">
        {/* Mic Icon with recording animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Rotating ring animation */}
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
            
            {/* Mic icon container */}
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-zinc-900 animate-float shadow-lg">
              <Mic className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Hero Text with fade-in animation */}
        <h1 className="max-w-4xl mx-auto text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl animate-fade-in">
          Turn Your Golf Talk Into Insights
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-zinc-600 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Stop losing valuable insights after your round. Just talk about your game like you always do, and let AI reveal patterns in your game
        </p>

        {/* CTA Buttons with scale animation on hover */}
        <div className="flex flex-col gap-4 mt-10 sm:flex-row sm:justify-center sm:gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button
            onClick={() => navigate("/record")}
            size="lg"
            className="text-base font-medium bg-zinc-900 hover:bg-zinc-800 transform transition-all duration-200 hover:scale-105"
          >
            Start your GolfLog
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/login")}
            className="text-base font-medium border-zinc-200 transform transition-all duration-200 hover:scale-105"
          >
            See how it works
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;