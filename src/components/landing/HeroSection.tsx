import AnimatedMicIcon from "@/components/hero/AnimatedMicIcon";
import AnimatedTitle from "@/components/hero/AnimatedTitle";
import HeroContent from "@/components/hero/HeroContent";

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <AnimatedMicIcon />
          <AnimatedTitle />
          <HeroContent />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;