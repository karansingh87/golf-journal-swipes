import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PowerFeaturesSection from "@/components/landing/PowerFeaturesSection";
import FAQSection from "@/components/landing/FAQSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import Navigation from "@/components/landing/Navigation";

const Landing = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <PowerFeaturesSection />
      <FAQSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Landing;