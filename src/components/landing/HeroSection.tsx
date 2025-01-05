import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface HeroSectionProps {
  content?: {
    title: string;
    subtitle: string;
  };
}

const HeroSection = ({ content }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-12 flex flex-col items-center text-center">
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
            <div className="w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950"></div>
              <Mic className="w-12 h-12 text-white relative z-10" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 max-w-4xl mx-auto">
            {content?.title || "Turn Your Golf Talk Into Insights"}
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl leading-8 text-zinc-600 max-w-2xl mx-auto">
            {content?.subtitle || "Stop losing valuable insights after your round. Just talk about your game like you always do, and let AI reveal patterns in your game"}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("/signup")}
              className="text-base px-6 py-2.5 h-auto bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group"
            >
              <span className="relative z-10">Start your GolfLog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/demo")}
              className="text-base px-6 py-2.5 h-auto border-zinc-200 text-zinc-900 hover:bg-zinc-50 relative overflow-hidden group"
            >
              <span className="relative z-10">See how it works</span>
              <div className="absolute inset-0 bg-zinc-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;