import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [gradient, setGradient] = useState(getRandomGradient());

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: getTypeLabel(pattern.type),
        text: `${pattern.primary_insight}\n\n${pattern.details}`,
      });
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-[90vw] h-[50vh] mx-auto px-4"
      style={{ perspective: "1000px" }}
    >
      <div
        className={cn(
          "relative h-full w-full cursor-pointer",
          "transform-gpu transition-all duration-700",
          isFlipped ? "rotate-y-180" : ""
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card 
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden",
            "overflow-hidden border-0 rounded-3xl transition-all duration-500",
            "bg-gradient-to-br",
            gradient.from,
            gradient.to
          )}
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          <CardContent
            type={getTypeLabel(pattern.type)}
            title={pattern.primary_insight}
            content={pattern.primary_insight}
            gradientClasses={`bg-gradient-to-br ${gradient.from} ${gradient.to}`}
            borderClass={gradient.border}
          />
        </Card>

        {/* Back of card */}
        <Card 
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden",
            "overflow-hidden border-0 rounded-3xl transition-all duration-500",
            "bg-gradient-to-br",
            gradient.from,
            gradient.to,
            "bg-opacity-90"
          )}
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)"
          }}
        >
          <CardContent
            type={getTypeLabel(pattern.type)}
            title={pattern.primary_insight}
            content={pattern.details}
            isBack={true}
            gradientClasses={`bg-gradient-to-br ${gradient.from} ${gradient.to}`}
            borderClass={gradient.border}
            onShare={handleShare}
          />
        </Card>
      </div>
    </motion.div>
  );
};

export default PatternCard;