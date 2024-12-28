import { Card } from "@/components/ui/card";
import { Brain, Star, Target, TrendingUp, AlertOctagon, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Pattern {
  type: "hidden_strength" | "mental_signature" | "game_changing" | "strategic_instinct" | "growth_indicator";
  primary_insight: string;
  details: string;
}

interface PatternCardProps {
  pattern: Pattern;
}

const PatternCard = ({ pattern }: PatternCardProps) => {
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
      // Handle share error silently
      console.log('Share failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 min-h-[calc(100vh-8rem)]"
    >
      <Card className={cn(
        "relative overflow-hidden border-0 rounded-3xl transition-all duration-500",
        "h-[calc(100vh-8rem)] flex flex-col justify-center p-8 md:p-12",
        getGradientBackground(pattern.type)
      )}>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
            {pattern.primary_insight}
          </h2>

          {/* Details */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            {pattern.details}
          </p>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-6 right-6 rounded-full hover:bg-white/20"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default PatternCard;