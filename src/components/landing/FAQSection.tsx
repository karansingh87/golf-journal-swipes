import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const defaultQuestions = [
    {
      question: "What exactly is GolfLog?",
      answer: "GolfLog is a web app that turns your post-round thoughts into actionable golf insights. Just talk or type about your game, and our AI helps you understand your performance, mental game, and improvement opportunities."
    },
    {
      question: "How does it work?",
      answer: "Record a voice note or type insights after your round or practice. Our AI analyzes your session, spotting patterns in your technical skills, mental approach, and overall performance. It's like having a personal golf analyst in your pocket."
    },
    {
      question: "Do I need to be a tech expert to use it?",
      answer: "Not at all! If you can chat about golf with a friend, you can use GolfLog. It takes less than 60 seconds to start. Just open golflog.ai, create an account, and you're ready to go. No downloads, no complicated setup."
    },
    {
      question: "Is my data private?",
      answer: "100% private. Your insights are only visible to you, and we securely encrypt everything. You control what to share and with whom."
    },
    {
      question: "How much does it cost?",
      answer: "Start with a full 30-day trial - no credit card needed. After that, it's $11.99/month, giving you unlimited recordings, AI analysis, and performance tracking."
    }
  ];

  const questions = content?.questions || defaultQuestions;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display tracking-tight text-zinc-900 sm:text-4xl">
            {content?.title || "Frequently asked questions"}
          </h2>
        </div>
        
        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 bg-white px-4 transition-all duration-200 hover:bg-zinc-50/50"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-base font-medium tracking-tight text-zinc-900">
                  {faq.question}
                </span>
                <Plus 
                  className={cn(
                    "h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200",
                    openIndex === index && "rotate-45"
                  )} 
                />
              </button>
              {openIndex === index && (
                <div className="pb-4 text-[15px] leading-normal text-zinc-600 animate-accordion-down">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;