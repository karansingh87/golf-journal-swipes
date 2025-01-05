import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start."
    },
    {
      question: "Can I access my recordings offline?",
      answer: "Yes, you can download your recordings for offline access. They'll automatically sync back when you're online."
    },
    {
      question: "How secure are my recordings?",
      answer: "Your recordings are encrypted and stored securely. Only you and those you explicitly share with can access them."
    },
    {
      question: "Can I share recordings with my coach?",
      answer: "Yes, you can easily share specific recordings or your entire progress history with your coach through a secure link."
    }
  ];

  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#4169E1] mb-16 text-center">
          Common Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#4169E1]/10">
              <AccordionTrigger className="text-lg text-left font-medium text-[#3154b3] py-6 hover:no-underline hover:text-[#4169E1]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#3154b3]/80 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;