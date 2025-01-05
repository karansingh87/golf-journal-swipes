import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";
import GridBackground from "@/components/landing/GridBackground";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Enhanced grid background */}
      <GridBackground />
      
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