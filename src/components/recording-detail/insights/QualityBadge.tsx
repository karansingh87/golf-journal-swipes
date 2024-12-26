import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Quality = 'high' | 'medium' | 'low';

interface QualityBadgeProps {
  quality: Quality;
  label: string;
  className?: string;
}

const qualityColors: Record<Quality, { bg: string; text: string; ring: string }> = {
  high: { 
    bg: 'bg-[#F2FCE2]', 
    text: 'text-[#2B5F1E]',
    ring: 'ring-[#2B5F1E]/10' 
  },
  medium: { 
    bg: 'bg-[#FEF7CD]', 
    text: 'text-[#915930]',
    ring: 'ring-[#915930]/10'
  },
  low: { 
    bg: 'bg-[#FFDEE2]', 
    text: 'text-[#B42318]',
    ring: 'ring-[#B42318]/10'
  },
};

const QualityBadge = ({ quality, label, className }: QualityBadgeProps) => {
  const colors = qualityColors[quality];
  
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium border-0 ring-1 shadow-sm",
        "px-3 py-1",
        colors.bg,
        colors.text,
        colors.ring,
        className
      )}
    >
      {label}
    </Badge>
  );
};

export default QualityBadge;