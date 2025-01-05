import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-24 bg-white/80 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            One Plan, Total Access
          </h2>
          
          <div className="mt-16 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-card-light hover-card-animation">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-semibold text-zinc-900">$19</span>
              <span className="text-xl text-zinc-600">/month</span>
            </div>
            
            <p className="mt-6 text-lg text-zinc-600">
              We offer an all-inclusive, ad-free golf experience designed for serious players who want to improve.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Ad-free recording experience",
                "High-fidelity audio storage",
                "Access to exclusive content",
                "Access to early features",
                "Unlimited recordings",
                "Curated insights",
                "Share with your coach",
                "Multi-device support",
                "Priority customer support"
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-zinc-600">
                  <Check className="w-5 h-5 text-zinc-600 animate-float" style={{ animationDelay: '0.1s' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg"
              className="w-full mt-10 text-base font-medium bg-zinc-900 hover:bg-zinc-800 transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/record")}
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