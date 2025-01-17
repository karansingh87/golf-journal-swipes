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
    <div className="relative py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-zinc-900">
            {content?.title || "One membership, full access"}
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 w-full max-w-sm mx-auto h-[500px] blur-[120px] opacity-50"
            style={{
              background: "radial-gradient(circle at center, rgba(229,222,255,0.8) 0%, rgba(255,222,226,0.8) 50%, rgba(211,228,253,0.8) 100%)",
              transform: "translate(0, -50px)",
              pointerEvents: "none",
            }}
          />
          
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
            <div className="relative px-6 pt-6 pb-8">
              {/* Plan Type */}
              <div className="text-center">
                <h3 className="text-lg font-medium uppercase tracking-wider text-zinc-400 mb-6">
                  &nbsp;
                </h3>
                
                {/* Features List */}
                <div className="space-y-4 mb-6">
                  <ul className="space-y-2.5">
                    {[
                      ...(content?.features?.core || defaultFeatures.core),
                      ...(content?.features?.power || defaultFeatures.power),
                      ...(content?.features?.extras || defaultFeatures.extras),
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="rounded-full p-1">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider with gradient */}
                <div className="h-px my-6 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                
                {/* Pricing Content */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold tracking-tight text-white">$12</span>
                    <span className="text-xl text-zinc-400 ms-2">/month</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-base font-semibold text-zinc-300">Try free for 30 days</span>
                    <span className="text-sm text-zinc-400">No credit card required</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate("/signup")}
                  className="mt-6 w-full bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200 h-12 rounded-xl text-base font-medium"
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