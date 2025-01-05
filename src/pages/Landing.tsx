import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-0 grid-background" />
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
            {/* App Icon */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/55c59618-ff9c-4053-ad6e-04a165dca4ec.png" 
                alt="GolfLog App Icon" 
                className="w-24 h-24"
              />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 max-w-4xl mx-auto">
              Turn Your Golf Talk Into Insights
            </h1>
            
            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Stop losing valuable insights after your round. Just talk about your game like you always do, and let AI reveal patterns in your game
            </p>
            
            {/* CTA Buttons */}
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
    </div>
  );
};

export default Landing;