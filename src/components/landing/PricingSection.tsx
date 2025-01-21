import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const PricingSection = ({ content }: PricingSectionProps) => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  
  const defaultFeatures = {
    free: [
      "Unlimited voice & text recordings",
      "AI game analysis",
      "Personal recording history",
      "Core features access",
    ],
    pro: [
      "Advanced AI analysis & insights",
      "Mental game coaching & pep talks",
      "Smart lesson prep & coach sharing",
      "Full feature access & early updates",
    ],
  };
  
  return (
    <div className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight text-zinc-900">
            Simple, transparent pricing
          </h2>
          
          {/* Billing Toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={cn("text-sm", !isAnnual && "font-medium text-zinc-900")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-900 transition-colors focus:outline-none"
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm", isAnnual && "font-medium text-zinc-900")}>
              Annual <span className="text-emerald-500 font-medium">(Save 17%)</span>
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          {/* Free Plan */}
          <div className="relative overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold leading-8 text-zinc-900">Free</h3>
              <p className="mt-1 text-sm text-zinc-600">Start your golf journey</p>
              <p className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight text-zinc-900">$0</span>
                <span className="ml-1 text-sm text-zinc-600">/forever</span>
              </p>
              
              <ul className="mt-8 space-y-3">
                {defaultFeatures.free.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/signup")}
                className="mt-8 w-full bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 h-11"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-xl">
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                Most Popular
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
              <p className="mt-1 text-sm text-zinc-300">Elevate your game</p>
              <p className="mt-4 flex items-baseline text-white">
                <span className="text-4xl font-bold tracking-tight">
                  ${isAnnual ? "59.99" : "5.99"}
                </span>
                <span className="ml-1 text-sm text-zinc-300">
                  /{isAnnual ? "year" : "month"}
                </span>
              </p>
              
              <ul className="mt-8 space-y-3">
                {defaultFeatures.pro.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate(`/signup?plan=${isAnnual ? "annual" : "monthly"}`)}
                className="mt-8 w-full bg-white text-zinc-900 hover:bg-zinc-50 h-11"
              >
                Get Pro Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;