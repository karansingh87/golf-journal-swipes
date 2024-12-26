import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Quality = 'high' | 'medium' | 'low';

interface QualityBadgeProps {
  quality: Quality;
  label: string;
  className?: string;
}

const qualityColors: Record<Quality, { bg: string; text: string }> = {
  high: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300' },
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-300' },
  low: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300' },
};

const QualityBadge = ({ quality, label, className }: QualityBadgeProps) => {
  const colors = qualityColors[quality];
  
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      {label}
    </Badge>
  );
};

export default QualityBadge;