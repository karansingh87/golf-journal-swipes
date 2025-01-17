import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I get started with GolfLog?",
        answer: "Less than 60 seconds. Just open golflog.ai in your browser, create an account, and you're ready to record your first thoughts. No downloads needed - use it your way, voice or text."
      },
      {
        question: "Is GolfLog an app I download?",
        answer: "GolfLog is a web app - no download needed. Just open golflog.ai in your browser and you're ready to go. Add it to your home screen for quick access."
      },
      {
        question: "Can I use GolfLog offline?",
        answer: "GolfLog needs an internet connection to work. This helps keep your insights synced and enables our AI analysis. Make sure you have connection when recording or reviewing your insights."
      }
    ]
  },
  {
    title: "Using GolfLog",
    questions: [
      {
        question: "When and where should I record my insights?",
        answer: "Whatever works best for you! Many golfers record voice notes during their drive home while thoughts are fresh. Others prefer typing quick notes right after their round or practice. Some mix both. GolfLog adapts to your comfort and situation."
      },
      {
        question: "How long should I record for?",
        answer: "You've got up to 10 minutes per session, but most golfers find their sweet spot at 3-5 minutes. Just enough time to capture those key insights without overthinking it."
      },
      {
        question: "Can I type instead of recording?",
        answer: "Absolutely! Some golfers prefer typing, especially at the range or clubhouse. Toggle between voice and keyboard anytime - whatever feels right in the moment."
      },
      {
        question: "What should I talk about?",
        answer: "Start with what's fresh in your mind: that perfect drive on 7, the new putting grip that worked, or why the back nine felt better than the front. No need to cover everything - focus on what stood out today."
      },
      {
        question: "I feel awkward talking about my game - any tips?",
        answer: "Totally normal! Start simple - what went well today? What would you tell a friend about your round? Just talk like you're chatting at the 19th hole. No script needed, just your natural golf thoughts."
      }
    ]
  },
  {
    title: "AI & Features",
    questions: [
      {
        question: "How does GolfLog understand golf so well?",
        answer: "Our AI has been fine-tuned by analyzing thousands of real golf insights from hundreds of golfers. From weekend players to scratch golfers, from swing thoughts to course strategy, it understands how golfers actually think and talk about their game. Like having a caddie who's learned from countless rounds."
      },
      {
        question: "How many recordings do I need for AI insights?",
        answer: "Start seeing patterns after just 3 recordings. The more you chat with GolfLog, the better it gets at understanding your game. Like a caddie who learns your tendencies over time."
      },
      {
        question: "What kind of trends can GolfLog spot?",
        answer: "Everything from technical patterns (which swing thoughts led to your best shots) to mental game insights (what helps you perform under pressure). GolfLog looks across all your recordings to find what really works in your game. It's like having a golf data analyst in your pocket."
      },
      {
        question: "What's a pep talk?",
        answer: "Before your round, GolfLog looks at your recent success patterns and creates a confidence-boosting reminder of what works in your game. Like a friend reminding you of your best moments."
      },
      {
        question: "How does GolfLog help with lessons?",
        answer: "It turns your scattered golf thoughts into focused lesson prep. Recent breakthroughs, ongoing challenges, and specific questions - all organized for productive sessions with your coach. Plus, you can track progress on what you're working on between lessons."
      }
    ]
  },
  {
    title: "Privacy & Data",
    questions: [
      {
        question: "What happens to my voice recordings?",
        answer: "Your voice is instantly turned into text - you'll see your exact words, but we don't store the audio. You'll always have your complete transcript to review, but the original voice recording isn't saved."
      },
      {
        question: "Is my data private?",
        answer: "100%. Your insights are private by default and only visible to you. You choose what to share and with whom. Everything's securely encrypted."
      }
    ]
  },
  {
    title: "Pricing & Trial",
    questions: [
      {
        question: "How does the trial work?",
        answer: "Start with a full 30 days of unlimited access. No credit card needed, no commitments. Experience everything GolfLog offers and see how it improves your game."
      },
      {
        question: "What's included in the membership?",
        answer: "Full access to all features including unlimited recordings, AI analysis, performance trends, pep talks, lesson prep, and early access to new features. $11.99/month, billed annually."
      }
    ]
  }
];

export const FAQSection = () => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl font-display tracking-tight text-zinc-900 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqCategories.map((category, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-800">
              {category.title}
            </h3>
            <Accordion type="single" collapsible className="space-y-2">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem
                  key={faqIndex}
                  value={`${index}-${faqIndex}`}
                  className="border border-zinc-200/80 bg-white/80 backdrop-blur-sm rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-zinc-800">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};