import HeroSection from "@/components/landing/HeroSection";
import AppShowcase from "@/components/landing/AppShowcase";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <AppShowcase />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Landing;