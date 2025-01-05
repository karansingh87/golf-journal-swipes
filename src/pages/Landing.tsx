import HeroSection from "@/components/landing/HeroSection";
import AppShowcase from "@/components/landing/AppShowcase";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200 rounded-full gradient-blob" />
        <div className="absolute top-3/4 -right-20 w-96 h-96 bg-purple-200 rounded-full gradient-blob" 
             style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full gradient-blob"
             style={{ animationDelay: '-4s' }} />
      </div>

      {/* Content */}
      <div className="relative">
        <HeroSection />
        <AppShowcase />
        <BenefitsSection />
        <PricingSection />
        <FAQSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Landing;