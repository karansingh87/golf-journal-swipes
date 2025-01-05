import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import PhoneMockup from "@/components/landing/PhoneMockup";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  const { data: content } = useQuery({
    queryKey: ['landingPageContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('*');
      
      if (error) throw error;
      
      return data.reduce((acc: Record<string, any>, item: any) => {
        acc[item.section] = item.content;
        return acc;
      }, {});
    }
  });

  return (
    <div className="min-h-screen bg-[#fefcfb]">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <Navigation />
      <HeroSection content={content?.hero} />
      <PhoneMockup />
      <BenefitsSection content={content?.benefits} />
      <PricingSection content={content?.pricing} />
      <FAQSection content={content?.faq} />
      <Footer />
    </div>
  );
};

export default Landing;