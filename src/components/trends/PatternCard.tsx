import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Star, Target, TrendingUp, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Pattern {
  type: "hidden_strength" | "mental_signature" | "game_changing" | "strategic_instinct" | "growth_indicator";
  primary_insight: string;
  details: string;
  confidence_score: number;
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

  const Icon = getIcon();

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {getTypeLabel(pattern.type)}
          <div className="ml-auto flex items-center gap-1 text-sm font-normal text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-yellow-400 stroke-yellow-400" />
            <span>{pattern.confidence_score}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium text-foreground">{pattern.primary_insight}</p>
        <p className="text-sm text-muted-foreground">{pattern.details}</p>
      </CardContent>
    </Card>
  );
};

export default PatternCard;