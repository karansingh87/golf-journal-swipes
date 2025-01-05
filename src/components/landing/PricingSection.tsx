import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
            One Plan,
          </h2>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mb-16">
            Total Access
          </h2>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="group rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-zinc-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-zinc-900">$19</span>
                <span className="text-base text-zinc-500">/month</span>
              </div>

              <p className="mt-6 text-base leading-7 text-zinc-600">
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
                    <div className="rounded-full p-1 bg-zinc-900 group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-base text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/signup")}
                className="mt-8 w-full text-base py-6 h-auto bg-zinc-900 hover:bg-zinc-800 relative overflow-hidden group"
              >
                <span className="relative z-10">Get started right now</span>
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