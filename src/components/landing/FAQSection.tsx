import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="py-24 bg-zinc-50">
      <div className="px-4 mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold text-center text-zinc-900 mb-16">
          Common Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-6">
          <AccordionItem value="cancel" className="border-none">
            <AccordionTrigger className="text-xl font-medium text-zinc-900 hover:no-underline">
              Can I cancel my subscription anytime?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 text-lg">
              Yes, you can cancel your subscription at any time. Once cancelled, you'll continue to have access until the end of your current billing period.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="trial" className="border-none">
            <AccordionTrigger className="text-xl font-medium text-zinc-900 hover:no-underline">
              Is there a free trial available?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 text-lg">
              Yes, we offer a 14-day free trial for new users. You can explore all premium features during this period with no commitment required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="offline" className="border-none">
            <AccordionTrigger className="text-xl font-medium text-zinc-900 hover:no-underline">
              How do I download recordings for offline access?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 text-lg">
              Premium users can download their recordings directly from the app. Simply tap the download icon next to any recording to save it for offline access.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data" className="border-none">
            <AccordionTrigger className="text-xl font-medium text-zinc-900 hover:no-underline">
              What happens to my data if I cancel?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 text-lg">
              Your data remains securely stored for 30 days after cancellation. You can reactivate your account during this period to regain access. After 30 days, data is permanently deleted.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="devices" className="border-none">
            <AccordionTrigger className="text-xl font-medium text-zinc-900 hover:no-underline">
              How many devices can I use?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 text-lg">
              Premium subscribers can use the app on unlimited devices simultaneously. Your recordings and insights sync automatically across all your devices.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;