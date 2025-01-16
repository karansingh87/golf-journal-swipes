import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

interface FAQSectionProps {
  content?: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const FAQSection = ({ content }: FAQSectionProps) => {
  const defaultQuestions = [
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
    }
  ];

  const questions = content?.questions || defaultQuestions;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display tracking-tight text-zinc-900 sm:text-4xl">
            {content?.title || "Frequently asked questions"}
          </h2>
        </div>
        
        <div className="space-y-3">
          <Accordion type="single" collapsible className="w-full">
            {questions.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group rounded-2xl border border-zinc-200 bg-white px-4 transition-all duration-200 data-[state=open]:bg-zinc-50/50"
              >
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left [&[data-state=open]>svg]:rotate-45">
                  <span className="text-base font-medium tracking-tight text-zinc-900">
                    {faq.question}
                  </span>
                  <Plus className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-0 text-[15px] leading-normal text-zinc-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;