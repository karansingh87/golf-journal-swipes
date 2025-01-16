import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  content?: {
    title: string;
    price: string;
    interval: string;
    description: string;
    features: {
      core: string[];
      power: string[];
      extras: string[];
    };
  };
}

const PricingSection = ({ content }: PricingSectionProps) => {
  const navigate = useNavigate();
  
  const defaultFeatures = {
    core: [
      "Unlimited voice & text recordings",
      "Real-time insights after each round",
      "Complete history of your golf journey",
      "AI-powered game analysis",
    ],
    power: [
      "Spot patterns across multiple rounds",
      "Get confidence boosts before play",
      "Smart lesson prep summaries",
      "Share insights with your coach",
    ],
    extras: [
      "Early access to new features",
      "Full search across all notes",
      "Export your insights",
      "Priority support",
    ],
  };
  
  return (
    <div className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mb-16">
            {content?.title || "Simple, transparent pricing"}
          </h2>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-zinc-900">$11.99</span>
                  <span className="text-base text-zinc-600">/month</span>
                </div>
                <span className="text-sm text-zinc-500 mt-1">billed annually</span>
                <span className="text-base font-medium text-zinc-800 mt-3">Try free for 30 days</span>
              </div>

              {/* Core Features */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Core Features</h3>
                <ul className="space-y-3">
                  {(content?.features?.core || defaultFeatures.core).map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="rounded-full p-1 bg-zinc-900 group-hover:scale-110 transition-transform duration-300">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-base leading-7 text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Power Features */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Power Features</h3>
                <ul className="space-y-3">
                  {(content?.features?.power || defaultFeatures.power).map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="rounded-full p-1 bg-zinc-900 group-hover:scale-110 transition-transform duration-300">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-base leading-7 text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extras */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Extras</h3>
                <ul className="space-y-3">
                  {(content?.features?.extras || defaultFeatures.extras).map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="rounded-full p-1 bg-zinc-900 group-hover:scale-110 transition-transform duration-300">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-base leading-7 text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => navigate("/signup")}
                className="mt-4 w-full text-base px-6 py-3 h-auto bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">Start 30-Day Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;