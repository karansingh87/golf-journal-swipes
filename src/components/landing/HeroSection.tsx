import AnimatedMicIcon from "@/components/hero/AnimatedMicIcon";
import AnimatedTitle from "@/components/hero/AnimatedTitle";
import HeroContent from "@/components/hero/HeroContent";

const HeroSection = () => {
  return (
    <div className="relative pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-12 flex flex-col items-center text-center">
          <AnimatedMicIcon />
          <AnimatedTitle />
          <HeroContent />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;