import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Record thoughts",
    golflog: true,
    other: true,
    description: "Capture ideas on the go"
  },
  {
    name: "AI Analysis",
    golflog: true,
    other: false,
    description: "Get instant insights from your recordings"
  },
  {
    name: "Pattern Recognition",
    golflog: true,
    other: false,
    description: "Identify trends in your game"
  },
  {
    name: "Mental Game Coaching",
    golflog: true,
    other: false,
    description: "AI-powered guidance for improvement"
  },
  {
    name: "Structured Insights",
    golflog: true,
    other: false,
    description: "Organized feedback for better learning"
  }
];

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-display text-zinc-900 mb-4"
          >
            Not Just Another Notes App
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-zinc-500"
          >
            See how GolfLog transforms your golf journey beyond basic note-taking
          </motion.p>
        </div>

        <div className="relative">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 w-1/3">
                  <span className="text-sm text-zinc-500">Feature</span>
                </th>
                <th className="px-6 py-4 w-1/3">
                  <span className="text-sm font-semibold text-zinc-900">GolfLog</span>
                </th>
                <th className="px-6 py-4 w-1/3">
                  <span className="text-sm text-zinc-500">Notes/Voice Memos</span>
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
                >
                  <td className="text-left py-6 px-6">
                    <div className="font-medium text-sm text-zinc-900">{feature.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">{feature.description}</div>
                  </td>
                  <td className="px-6 py-6">
                    {feature.golflog ? (
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-zinc-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    {feature.other ? (
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-zinc-300" />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;