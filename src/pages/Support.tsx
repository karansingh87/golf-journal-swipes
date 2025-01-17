import { FAQSection } from "@/components/support/FAQSection";
import { ContactForm } from "@/components/support/ContactForm";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="relative pt-14">
        <PageBreadcrumb currentPage="Support" />
        <div className="container max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-20">
            <div>
              <h2 className="text-2xl font-display tracking-tight text-zinc-900 mb-8">
                Frequently Asked Questions
              </h2>
              <FAQSection />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;