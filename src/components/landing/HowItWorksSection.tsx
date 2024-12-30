import HowItWorksStep from "./HowItWorksStep";

const steps = [
  {
    number: "1",
    title: "Record Your Thoughts",
    description: "Just tap record and talk about your game - at the range or after your round. No typing needed.",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  {
    number: "2",
    title: "Get Smart Insights",
    description: "AI analyzes your thoughts and organizes them into actionable insights about your game.",
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    number: "3",
    title: "Track Your Progress",
    description: "Review your journey, spot patterns, and build on what works for your game.",
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    number: "4",
    title: "Share and Learn",
    description: "Share insights with your coach or keep them private - it's up to you.",
    image: "photo-1581091226825-a6a2a5aee158"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-12">
          <div className="text-center space-y-6">
            <div className="bg-zinc-800/80 px-4 py-1.5 rounded-full inline-block">
              <span className="text-sm font-medium text-white">How it works</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-medium text-white">
                Getting started is <span className="font-serif italic">simple</span>
              </h2>
              <p className="text-lg text-zinc-400">
                A simple, four step process to improving your golf game
              </p>
            </div>
          </div>

          <div className="grid gap-8 w-full max-w-4xl">
            {steps.map((step, index) => (
              <HowItWorksStep key={step.number} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;