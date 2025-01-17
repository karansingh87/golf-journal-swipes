import { ContactForm } from "@/components/support/ContactForm";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      <div className="relative pt-14">
        <PageBreadcrumb currentPage="Contact" />
        <div className="container max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-display tracking-tight text-zinc-900 text-center mb-8">
            Get in Touch
          </h1>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;