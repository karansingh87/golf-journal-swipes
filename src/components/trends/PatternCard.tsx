import { Card } from "@/components/ui/card";
import { Brain, Star, Target, TrendingUp, AlertOctagon, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  const getIcon = () => {
    switch (pattern.type) {
      case "hidden_strength":
        return Star;
      case "mental_signature":
        return Brain;
      case "strategic_instinct":
        return Target;
      case "growth_indicator":
        return TrendingUp;
      case "game_changing":
        return AlertOctagon;
      default:
        return Star;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getGradientBackground = (type: string) => {
    switch (type) {
      case "hidden_strength":
        return "bg-gradient-to-br from-amber-50 to-orange-100";
      case "mental_signature":
        return "bg-gradient-to-br from-purple-50 to-indigo-100";
      case "strategic_instinct":
        return "bg-gradient-to-br from-emerald-50 to-teal-100";
      case "growth_indicator":
        return "bg-gradient-to-br from-sky-50 to-blue-100";
      case "game_changing":
        return "bg-gradient-to-br from-rose-50 to-pink-100";
      default:
        return "bg-gradient-to-br from-gray-50 to-slate-100";
    }
  };

  const Icon = getIcon();

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
      className="w-full max-w-[90vw] h-[117vh] mx-auto px-4"
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
            getGradientBackground(pattern.type)
          )}
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Premium texture overlay */}
            <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
            
            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Category Label */}
              <div className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground/80 uppercase">
                <Icon className="h-4 w-4" />
                <span className="font-medium">{getTypeLabel(pattern.type)}</span>
              </div>

              {/* Main Insight */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground">
                {pattern.primary_insight}
              </h2>
            </div>

            {/* Flip indicator */}
            <div className="relative z-10 flex items-center justify-center gap-2 text-sm text-muted-foreground/70">
              <RotateCw className="h-4 w-4" />
              <span>Tap for details</span>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card 
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden",
            "overflow-hidden border-0 rounded-3xl transition-all duration-500",
            getGradientBackground(pattern.type),
            "bg-opacity-90"
          )}
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)"
          }}
        >
          <div className="relative h-full flex flex-col p-8">
            {/* Premium texture overlay */}
            <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-10" />
            
            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Category Label */}
              <div className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground/80 uppercase">
                <Icon className="h-4 w-4" />
                <span className="font-medium">{getTypeLabel(pattern.type)}</span>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {pattern.details}
                </p>
              </div>
            </div>

            {/* Share Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-6 right-6 rounded-full hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              Share insight
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default PatternCard;