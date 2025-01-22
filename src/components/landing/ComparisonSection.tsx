import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Record thoughts",
    golflog: true,
    notes: true,
    memos: true,
    description: "Capture ideas on the go"
  },
  {
    name: "AI Analysis",
    golflog: true,
    notes: false,
    memos: false,
    description: "Get instant insights from your recordings"
  },
  {
    name: "Pattern Recognition",
    golflog: true,
    notes: false,
    memos: false,
    description: "Identify trends in your game"
  },
  {
    name: "Mental Game Coaching",
    golflog: true,
    notes: false,
    memos: false,
    description: "AI-powered guidance for improvement"
  },
  {
    name: "Structured Insights",
    golflog: true,
    notes: false,
    memos: false,
    description: "Organized feedback for better learning"
  }
];

const ComparisonSection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(211,228,253,0.05),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 mb-6 bg-zinc-950"
          >
            <span className="text-sm font-medium text-zinc-50">
              Why GolfLog?
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-display sm:text-4xl text-zinc-900 mb-4"
          >
            Not Just Another Notes App
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-600 max-w-2xl mx-auto"
          >
            See how GolfLog transforms your golf journey beyond basic note-taking
          </motion.p>
        </div>

        <div className="relative">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 bg-white sticky left-0 z-10 min-w-[200px]">
                    <span className="text-zinc-900 font-display">Feature</span>
                  </th>
                  <th className="px-6 py-4 bg-zinc-950/5">
                    <span className="text-zinc-900 font-display">GolfLog</span>
                  </th>
                  <th className="px-6 py-4">
                    <span className="text-zinc-600">Notes App</span>
                  </th>
                  <th className="px-6 py-4">
                    <span className="text-zinc-600">Voice Memos</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                    }}
                    className={index % 2 === 0 ? "bg-white" : "bg-zinc-950/[0.02]"}
                  >
                    <td className="text-left py-4 px-6 sticky left-0 bg-inherit">
                      <div className="font-medium text-zinc-900">{feature.name}</div>
                      <div className="text-sm text-zinc-600">{feature.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {feature.golflog ? (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-zinc-200/50 flex items-center justify-center">
                            <X className="h-5 w-5 text-zinc-400" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {feature.notes ? (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-zinc-200/50 flex items-center justify-center">
                            <X className="h-5 w-5 text-zinc-400" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {feature.memos ? (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded-full bg-zinc-200/50 flex items-center justify-center">
                            <X className="h-5 w-5 text-zinc-400" />
                          </div>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;