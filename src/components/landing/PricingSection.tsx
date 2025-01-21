import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  content?: {
    title: string;
    description: string;
    features: {
      core: string[];
      power: string[];
      extras: string[];
    };
  };
}

const MONTHLY_PRICE_ID = "price_1QjbKgLbszPXbxPVjqNTDLHQ";
const ANNUAL_PRICE_ID = "price_1QjbKnLbszPXbxPVXHDgF7LJ";
const LIFETIME_PRICE_ID = "price_1Qjb8oLbszPXbxPV8dKn8RAJ";

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
    <div className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-zinc-900">
            {content?.title || "Choose your plan"}
          </h2>
        </div>

        <div className="mx-auto max-w-lg grid gap-8">
          {/* Monthly Plan */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
            <div className="relative px-6 pt-4 pb-6">
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

              <div className="h-px my-5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
              
              <div className="space-y-4">
                {/* Monthly Option */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold tracking-tight text-white">$5.99</span>
                    <span className="text-lg text-zinc-400 ms-2">/month</span>
                  </div>
                  <Button
                    onClick={() => navigate("/signup?plan=monthly")}
                    className="w-full bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200 h-12 rounded-xl text-base font-medium"
                  >
                    Get Started Monthly
                  </Button>
                </div>

                {/* Annual Option */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold tracking-tight text-white">$59.99</span>
                    <span className="text-lg text-zinc-400 ms-2">/year</span>
                  </div>
                  <div className="text-center text-sm text-emerald-400 font-medium mb-2">
                    Save 17% with annual billing
                  </div>
                  <Button
                    onClick={() => navigate("/signup?plan=annual")}
                    className="w-full bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-[1.02] transition-all duration-200 h-12 rounded-xl text-base font-medium"
                  >
                    Get Started Annually
                  </Button>
                </div>

                {/* Lifetime Option */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold tracking-tight text-white">$99.99</span>
                    <span className="text-lg text-zinc-400 ms-2">one-time</span>
                  </div>
                  <div className="text-center text-sm text-emerald-400 font-medium mb-2">
                    Lifetime access, one payment
                  </div>
                  <Button
                    onClick={() => navigate("/signup?plan=lifetime")}
                    className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 hover:scale-[1.02] transition-all duration-200 h-12 rounded-xl text-base font-medium"
                  >
                    Get Lifetime Access
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;