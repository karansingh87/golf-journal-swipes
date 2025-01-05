import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
};

export default Landing;