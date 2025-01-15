import { LineChart, Brain, Share2 } from "lucide-react";

const features = [
  {
    name: "Trend Spotting",
    description: "See patterns across multiple rounds. Smart analysis connects the dots between your best performances.",
    icon: LineChart,
  },
  {
    name: "Instant Confidence",
    description: "Get AI-powered pep talks based on your recent rounds. Remind yourself what works before you play.",
    icon: Brain,
  },
  {
    name: "Better Lessons",
    description: "Share structured insights with your coach. Transform random thoughts into focused improvement plans.",
    icon: Share2,
  },
];

const PowerFeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-normal text-zinc-900 max-w-2xl">
            Power <span className="font-semibold">Features</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative overflow-hidden rounded-3xl bg-zinc-800 p-8 transition-all hover:ring-2 hover:ring-zinc-600"
            >
              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="rounded-full bg-zinc-700/50 p-3">
                    <feature.icon className="h-6 w-6 text-zinc-300" />
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-zinc-100">
                  {feature.name}
                </h3>
                <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerFeaturesSection;