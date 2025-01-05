import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient blobs - Added more blobs for continuous flow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-200 rounded-full gradient-blob" />
        <div className="absolute top-3/4 -right-20 w-96 h-96 bg-zinc-200 rounded-full gradient-blob" 
             style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-zinc-200 rounded-full gradient-blob"
             style={{ animationDelay: '-4s' }} />
        <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-zinc-200 rounded-full gradient-blob"
             style={{ animationDelay: '-6s' }} />
        <div className="absolute bottom-2/3 right-1/4 w-80 h-80 bg-zinc-200 rounded-full gradient-blob"
             style={{ animationDelay: '-8s' }} />
      </div>

      {/* Content with section fade-in animations */}
      <div className="relative">
        <div className="section-fade-in" style={{ animationDelay: '0s' }}>
          <HeroSection />
        </div>
        <div className="section-fade-in" style={{ animationDelay: '0.4s' }}>
          <BenefitsSection />
        </div>
        <div className="section-fade-in" style={{ animationDelay: '0.6s' }}>
          <PricingSection />
        </div>
        <div className="section-fade-in" style={{ animationDelay: '0.8s' }}>
          <FAQSection />
        </div>
        <div className="section-fade-in" style={{ animationDelay: '1s' }}>
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

export default Landing;