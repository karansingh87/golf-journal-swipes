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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mb-16">
            {content?.title || "Simple, transparent pricing"}
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-200/50">
            {/* Plan Type */}
            <div className="px-8 pt-8 text-center">
              <h3 className="text-lg font-medium uppercase tracking-wider text-zinc-500 mb-6">
                All Access
              </h3>
              
              {/* Pricing Content */}
              <div className="flex flex-col items-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl font-bold tracking-tight text-zinc-900">$12</span>
                  <span className="text-xl text-zinc-500 ms-2">/month</span>
                </div>
                <span className="mt-6 text-base font-medium text-zinc-800">Try free for 30 days</span>
              </div>
            </div>

            {/* Features List */}
            <div className="p-8 mt-4">
              <div className="space-y-8">
                {/* Core Features */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-4">
                    Core Features
                  </p>
                  <ul className="space-y-3.5">
                    {(content?.features?.core || defaultFeatures.core).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-zinc-900" />
                        <span className="text-sm text-zinc-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Power Features */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-4">
                    Power Features
                  </p>
                  <ul className="space-y-3.5">
                    {(content?.features?.power || defaultFeatures.power).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-zinc-900" />
                        <span className="text-sm text-zinc-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extras */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-4">
                    Extras
                  </p>
                  <ul className="space-y-3.5">
                    {(content?.features?.extras || defaultFeatures.extras).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-zinc-900" />
                        <span className="text-sm text-zinc-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => navigate("/signup")}
                className="mt-8 w-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 rounded-xl text-base font-medium"
              >
                Start 30-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;