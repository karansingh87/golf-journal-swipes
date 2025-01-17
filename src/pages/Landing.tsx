import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import PhoneMockup from "@/components/landing/PhoneMockup";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PowerFeaturesSection from "@/components/landing/PowerFeaturesSection";
import GolferStoriesSection from "@/components/landing/GolferStoriesSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import { FadeInView } from "@/components/ui/fade-in-view";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <Navigation />
      <HeroSection />
      
      {/* PhoneMockup without fade-in */}
      <PhoneMockup />
      
      <FadeInView>
        <BenefitsSection />
      </FadeInView>
      
      <FadeInView>
        <PowerFeaturesSection />
      </FadeInView>
      
      <FadeInView>
        <GolferStoriesSection />
      </FadeInView>
      
      <FadeInView>
        <PricingSection />
      </FadeInView>
      
      <FadeInView>
        <FAQSection />
      </FadeInView>
      
      <Footer />
    </div>
  );
};

export default Landing;