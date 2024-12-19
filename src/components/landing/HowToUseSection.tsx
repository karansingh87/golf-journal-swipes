import { motion } from "framer-motion";

const HowToUseSection = () => {
  const steps = [
    {
      number: "1",
      title: "Record Your Thoughts",
      description: "Just tap record and talk about your game - at the range or after your round. No typing needed."
    },
    {
      number: "2",
      title: "Get Smart Insights",
      description: "AI analyzes your thoughts and organizes them into actionable insights about your game."
    },
    {
      number: "3",
      title: "Track Your Progress",
      description: "Review your journey, spot patterns, and build on what works for your game."
    },
    {
      number: "4",
      title: "Share Your Journey",
      description: "Keep your coach or golf buddies in the loop with shareable insights."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 py-24">
      {/* Background glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ACE580]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with glowing line decorations */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ACE580]/50 to-transparent" />
          <h2 className="text-lg font-medium text-[#ACE580]/80">How it Works</h2>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ACE580]/50 to-transparent" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                {/* Step number */}
                <div className="text-4xl font-bold text-[#ACE580]/20">
                  /{step.number}
                </div>

                <div>
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;