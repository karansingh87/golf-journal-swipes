import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2FCE2]/50 to-[#D3E4FD]/50" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-zinc-900">
            Start Your Golf Journey
          </h2>
          <div className="flex flex-col items-center space-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ACE580] to-[#D3E4FD] rounded-full blur-lg opacity-75" />
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="relative bg-gradient-to-r from-[#ACE580] to-[#D3E4FD] hover:from-[#9BD56B] hover:to-[#BED8F8] text-white px-8 py-6 text-lg shadow-xl"
              >
                Start Your Golf Log
              </Button>
            </motion.div>
            <span className="text-sm text-zinc-500 font-medium">
              Your next round could be your best
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;