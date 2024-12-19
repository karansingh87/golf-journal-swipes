import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2FCE2]/50 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#ACE580] to-[#F2FCE2] bg-clip-text text-transparent font-jakarta">
            Start Your Golf Journey
          </h2>
          <div className="flex flex-col items-center space-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-gradient-to-r from-[#ACE580] to-[#F2FCE2] hover:opacity-90 text-zinc-900 px-8 py-6 text-lg rounded-full shadow-lg group font-jakarta"
              >
                Start Your Golf Log
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <span className="text-sm text-zinc-500 font-medium font-jakarta">
              Your next round could be your best
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;