import { Card } from "@/components/ui/card";
import { Brain, Share2, Star, Target, TrendingUp, AlertOctagon, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { useToast } from "@/hooks/use-toast";

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
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const shareTemplateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!navigator.share && !navigator.clipboard) {
      toast({
        title: "Sharing not supported",
        description: "Your device doesn't support sharing capabilities.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGeneratingImage(true);
      
      if (shareTemplateRef.current) {
        const dataUrl = await htmlToImage.toPng(shareTemplateRef.current, {
          quality: 1.0,
          pixelRatio: 3,
          width: 1080,
          height: 1920,
        });

        // Create a blob from the data URL
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'insight.png', { type: 'image/png' });

        if (navigator.share) {
          await navigator.share({
            title: getTypeLabel(pattern.type),
            text: `${pattern.primary_insight}\n\n${pattern.details}`,
            files: [file],
          });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(
            `${getTypeLabel(pattern.type)}\n\n${pattern.primary_insight}\n\n${pattern.details}`
          );
          toast({
            title: "Copied to clipboard",
            description: "The insight has been copied to your clipboard.",
          });
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Error sharing insight",
          description: "There was a problem sharing this insight. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const Icon = getIcon();

  return (
    <>
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
              "overflow-hidden border-0 rounded-3xl transition-all duration-500 shadow-lg",
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
              
              {/* Share button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 opacity-70 hover:opacity-100 z-20"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 text-black/70" />
              </Button>
              
              {/* Content */}
              <div className="relative z-10 space-y-8">
                {/* Category Label */}
                <div className="flex items-center gap-2 text-sm tracking-wide text-black/70 uppercase">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{getTypeLabel(pattern.type)}</span>
                </div>

                {/* Main Insight */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-black/80">
                  {pattern.primary_insight}
                </h2>
              </div>

              {/* Flip indicator */}
              <div className="relative z-10 flex items-center justify-center gap-2 text-sm text-black/50">
                <RotateCw className="h-4 w-4" />
                <span>Tap for details</span>
              </div>
            </div>
          </Card>

          {/* Back of card */}
          <Card 
            className={cn(
              "absolute inset-0 w-full h-full backface-hidden",
              "overflow-hidden border-0 rounded-3xl transition-all duration-500 shadow-lg",
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
              
              {/* Share button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 opacity-70 hover:opacity-100 z-20"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 text-black/70" />
              </Button>
              
              {/* Content */}
              <div className="relative z-10 space-y-8">
                {/* Category Label */}
                <div className="flex items-center gap-2 text-sm tracking-wide text-black/70 uppercase">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{getTypeLabel(pattern.type)}</span>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <p className="text-base md:text-lg text-black/70 leading-relaxed">
                    {pattern.details}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Hidden share template */}
      <div className="hidden">
        <div
          ref={shareTemplateRef}
          className={cn(
            "w-[1080px] h-[1920px] p-16 flex flex-col justify-between",
            getGradientBackground(pattern.type)
          )}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-lg tracking-wide text-black/70 uppercase">
              <Icon className="h-6 w-6" />
              <span className="font-medium">{getTypeLabel(pattern.type)}</span>
            </div>
            <h2 className="text-6xl font-bold leading-tight tracking-tight text-black/80">
              {pattern.primary_insight}
            </h2>
            <p className="text-2xl text-black/70 leading-relaxed">
              {pattern.details}
            </p>
          </div>
          <div className="text-center text-black/50 text-xl font-medium">
            GolfLog
          </div>
        </div>
      </div>
    </>
  );
};

export default PatternCard;