import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            One Plan,
          </h2>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-16">
            Total Access
          </h2>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">$19</span>
              <span className="text-base text-gray-500">/month</span>
            </div>

            <p className="mt-6 text-base leading-7 text-gray-600">
              We offer an all-inclusive, ad-free golf recording experience designed for serious golfers who want to improve their game.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Unlimited Voice Recording Time",
                "AI-Powered Game Analysis",
                "Access to Exclusive Insights",
                "Early Access to New Features",
                "No Ads or Interruptions",
                "Personalized Recommendations",
                "Coach Collaboration Tools",
                "Multi-Device Support",
                "Priority Customer Support",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-[#4169E1]" />
                  <span className="text-base text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate("/signup")}
              className="mt-8 w-full text-base py-6 h-auto bg-[#4169E1] hover:bg-[#3154b3]"
            >
              Get started right now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;