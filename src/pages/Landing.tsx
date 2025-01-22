import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import PhoneMockup from "@/components/landing/PhoneMockup";
import BenefitsSection from "@/components/landing/BenefitsSection";
import DetailedFeaturesSection from "@/components/landing/DetailedFeaturesSection";
import GolferStoriesSection from "@/components/landing/GolferStoriesSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import ComparisonSection from "@/components/landing/ComparisonSection";
import GradientBlobs from "@/components/landing/GradientBlobs";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      {/* Gradient Blobs */}
      <GradientBlobs />
      
      <Navigation />
      <div className="space-y-8 lg:space-y-16">
        <HeroSection />
        <PhoneMockup />
        <ComparisonSection />
        <BenefitsSection />
        <DetailedFeaturesSection />
        <GolferStoriesSection />
        <PricingSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;