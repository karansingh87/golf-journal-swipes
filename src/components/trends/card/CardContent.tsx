import { RotateCw } from "lucide-react";

interface CardContentProps {
  isFlipped: boolean;
  primary_insight: string;
  details?: string;
}

const CardContent = ({ isFlipped, primary_insight, details }: CardContentProps) => {
  if (isFlipped) {
    return (
      <div className="space-y-6">
        <p className="text-base md:text-lg text-black/70 leading-relaxed">
          {details}
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-black/80">
        {primary_insight}
      </h2>
      <div className="relative z-10 flex items-center justify-center gap-2 text-sm text-black/50">
        <RotateCw className="h-4 w-4" />
        <span>Tap for details</span>
      </div>
    </>
  );
};

export default CardContent;