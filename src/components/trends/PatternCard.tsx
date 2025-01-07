import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { getRandomGradient } from "./utils/patternColors";
import { CardContent } from "./CardContent";

interface Pattern {
  type: "hidden_strength" | "mental_signature" | "game_changing" | "strategic_instinct" | "growth_indicator";
  primary_insight: string;
  details: string;
}

interface PatternCardProps {
  pattern: Pattern;
}

const PatternCard = ({ pattern }: PatternCardProps) => {
  const [gradient] = useState(getRandomGradient());

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-[90vw] h-[55vh] mx-auto px-4"
    >
      <Card 
        className={cn(
          "w-full h-full",
          "overflow-hidden border-0 rounded-3xl",
          "bg-gradient-to-br",
          gradient.from,
          gradient.to
        )}
      >
        <CardContent
          type={getTypeLabel(pattern.type)}
          title={pattern.primary_insight}
          content={pattern.details}
          gradientClasses={`bg-gradient-to-br ${gradient.from} ${gradient.to}`}
          borderClass={gradient.border}
        />
      </Card>
    </motion.div>
  );
};

export default PatternCard;