import { cn } from "@/lib/utils";

interface CardBackgroundProps {
  type: string;
}

export const getGradientBackground = (type: string) => {
  switch (type) {
    case "hidden_strength":
      return "bg-gradient-to-br from-[#E5F9FF] via-[#C3F4FF] to-[#98DEFF]";
    case "mental_signature":
      return "bg-gradient-to-br from-[#FFF3E5] via-[#FFE4CC] to-[#FFD1A8]";
    case "strategic_instinct":
      return "bg-gradient-to-br from-[#F5FFE5] via-[#E4FFCC] to-[#CEFFA8]";
    case "growth_indicator":
      return "bg-gradient-to-br from-[#FFE5F9] via-[#FFC3E8] to-[#FFA3D8]";
    case "game_changing":
      return "bg-gradient-to-br from-[#E5E5FF] via-[#D1D1FF] to-[#B3B3FF]";
    default:
      return "bg-gradient-to-br from-gray-100 to-gray-200";
  }
};

const CardBackground = ({ type }: CardBackgroundProps) => (
  <div className="absolute inset-0">
    <div className={cn(
      "absolute inset-0",
      getGradientBackground(type)
    )} />
    <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
  </div>
);

export default CardBackground;