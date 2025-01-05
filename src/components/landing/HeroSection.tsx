import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default HeroSection;