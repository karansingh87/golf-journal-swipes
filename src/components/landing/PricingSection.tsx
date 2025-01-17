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
    ],
  };
  
  return (
    <div className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900">
            {content?.title || "Simple, transparent pricing"}
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-50" />
            
            {/* Content */}
            <div className="relative px-6 pt-8 pb-10">
              {/* Plan Type */}
              <div className="text-center">
                <h3 className="text-lg font-medium uppercase tracking-wider text-zinc-400 mb-8">
                  All Access
                </h3>
                
                {/* Features List */}
                <div className="space-y-6 mb-8">
                  <ul className="space-y-3">
                    {[
                      ...(content?.features?.core || defaultFeatures.core),
                      ...(content?.features?.power || defaultFeatures.power),
                      ...(content?.features?.extras || defaultFeatures.extras),
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="rounded-full p-1">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-800 my-8" />
                
                {/* Pricing Content */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold tracking-tight text-white">$12</span>
                    <span className="text-xl text-zinc-400 ms-2">/month</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-base font-semibold text-zinc-300">Try free for 30 days</span>
                    <span className="text-sm text-zinc-400">No credit card required</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate("/signup")}
                  className="mt-8 w-full bg-white text-zinc-900 hover:bg-zinc-100 h-12 rounded-xl text-base font-medium"
                >
                  Start 30-Day Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;