// Array of gradient backgrounds
const gradients = [
  {
    from: "from-purple-50",
    to: "to-indigo-100",
    border: "border-indigo-200"
  },
  {
    from: "from-amber-50",
    to: "to-orange-100",
    border: "border-orange-200"
  },
  {
    from: "from-emerald-50",
    to: "to-teal-100",
    border: "border-teal-200"
  },
  {
    from: "from-sky-50",
    to: "to-blue-100",
    border: "border-blue-200"
  },
  {
    from: "from-rose-50",
    to: "to-pink-100",
    border: "border-pink-200"
  }
];

// Keep track of used colors to ensure no repeats within a session
let usedColors = new Set<number>();

export const getRandomGradient = () => {
  // Reset if all colors have been used
  if (usedColors.size === gradients.length) {
    usedColors.clear();
  }

  // Get available colors
  const availableIndices = Array.from(
    { length: gradients.length },
    (_, i) => i
  ).filter(i => !usedColors.has(i));

  // Select random available color
  const randomIndex = availableIndices[
    Math.floor(Math.random() * availableIndices.length)
  ];
  
  usedColors.add(randomIndex);
  return gradients[randomIndex];
};
