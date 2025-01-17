import { FAQSection } from "@/components/support/FAQSection";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="relative pt-14">
        <PageBreadcrumb currentPage="FAQ" />
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-display tracking-tight text-zinc-900 pb-8">
            Frequently Asked Questions
          </h1>
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default FAQ;