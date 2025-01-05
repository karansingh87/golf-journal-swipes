import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default HeroSection;