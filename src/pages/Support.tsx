import { FAQSection } from "@/components/support/FAQSection";
import { ContactForm } from "@/components/support/ContactForm";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-display tracking-tight text-zinc-900 text-center mb-16">
          Support
        </h1>
        <FAQSection />
        <ContactForm />
      </div>
    </div>
  );
};

export default Support;