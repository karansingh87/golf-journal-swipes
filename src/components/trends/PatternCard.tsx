import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as htmlToImage from 'html-to-image';
import { useToast } from "@/hooks/use-toast";
import CardHeader, { getTypeLabel } from "./card/CardHeader";
import CardContent from "./card/CardContent";
import CardBackground from "./card/CardBackground";
import ShareTemplate from "./card/ShareTemplate";

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
              "overflow-hidden border-0 rounded-3xl transition-all duration-500 shadow-lg"
            )}
            style={{ 
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <div className="relative h-full flex flex-col justify-between p-8">
              <CardBackground type={pattern.type} />
              <CardHeader type={pattern.type} onShare={handleShare} />
              <CardContent 
                isFlipped={false}
                primary_insight={pattern.primary_insight}
              />
            </div>
          </Card>

          {/* Back of card */}
          <Card 
            className={cn(
              "absolute inset-0 w-full h-full backface-hidden",
              "overflow-hidden border-0 rounded-3xl transition-all duration-500 shadow-lg"
            )}
            style={{ 
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)"
            }}
          >
            <div className="relative h-full flex flex-col p-8">
              <CardBackground type={pattern.type} />
              <CardHeader type={pattern.type} onShare={handleShare} />
              <CardContent 
                isFlipped={true}
                primary_insight={pattern.primary_insight}
                details={pattern.details}
              />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Hidden share template */}
      <div className="hidden">
        <div ref={shareTemplateRef}>
          <ShareTemplate
            type={pattern.type}
            primary_insight={pattern.primary_insight}
            details={pattern.details}
          />
        </div>
      </div>
    </>
  );
};

export default PatternCard;