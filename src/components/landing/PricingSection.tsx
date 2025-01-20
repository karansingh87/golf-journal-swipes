import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

const MONTHLY_PRICE_ID = "price_1QjBd2LbszPXbxPVv7deyKtT";
const ANNUAL_PRICE_ID = "price_1QjBdELbszPXbxPVMBBRO6fz";

const PricingSection = ({ content }: PricingSectionProps) => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  
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
    <div className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-zinc-900">
            {content?.title || "One membership, full access"}
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-sm text-zinc-600">Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="billing-toggle" className="text-sm text-zinc-600">Annual</Label>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                Save 17%
              </span>
            </div>
          </div>

          {/* Gradient Background */}
          <div 
            className="absolute inset-0 w-full max-w-sm mx-auto h-[400px] blur-[120px] opacity-30"
            style={{
              background: "radial-gradient(circle at center, rgba(229,222,255,0.8) 0%, rgba(255,222,226,0.8) 50%, rgba(211,228,253,0.8) 100%)",
              transform: "translate(0, -30px)",
              pointerEvents: "none",
            }}
          />
          
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
            <div className="relative px-6 pt-4 pb-6">
              {/* Features List */}
              <div className="space-y-3 mb-5">
                <ul className="space-y-2">
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
              <div className="h-px my-5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
              
              {/* Pricing Content */}
              <div className="flex flex-col items-center space-y-2.5">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    ${isAnnual ? '89.99' : '8.99'}
                  </span>
                  <span className="text-xl text-zinc-400 ms-2">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {isAnnual && (
                  <div className="flex items-center gap-2 bg-emerald-900/30 px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Save 17% annually</span>
                  </div>
                )}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-base font-semibold text-zinc-300">Try free for 30 days</span>
                  <span className="text-sm text-zinc-400">No credit card required</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => navigate("/signup")}
                className="mt-5 w-full bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200 h-12 rounded-xl text-base font-medium"
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