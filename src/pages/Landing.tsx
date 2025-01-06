import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import PhoneMockup from "@/components/landing/PhoneMockup";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <Navigation />
      <HeroSection />
      <PhoneMockup />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Landing;