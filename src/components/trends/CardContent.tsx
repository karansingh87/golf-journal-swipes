import { cn } from "@/lib/utils";

interface CardContentProps {
  type: string;
  title: string;
  content: string;
  isBack?: boolean;
  gradientClasses: string;
  borderClass: string;
  onShare?: () => void;
}

export const CardContent = ({
  type,
  title,
  content,
  isBack,
  gradientClasses,
  borderClass,
  onShare
}: CardContentProps) => {
  return (
    <div className="relative h-full flex flex-col justify-between p-8">
      {/* Premium texture overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Category Label - Updated padding and text size */}
        <div className="inline-block">
          <span className={cn(
            "px-2.5 py-0.5 text-xs tracking-wide text-muted-foreground/80 uppercase",
            "bg-white rounded-full border",
            borderClass
          )}>
            {type}
          </span>
        </div>

        {isBack ? (
          <div className="space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {content}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
              {content}
            </p>
          </div>
        )}
      </div>

      {!isBack ? (
        <div className="relative z-10 flex items-center justify-center gap-2 text-sm text-muted-foreground/70">
          <span>Tap for details</span>
        </div>
      ) : onShare && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          className="absolute bottom-6 right-6 px-4 py-2 text-sm rounded-full hover:bg-white/20 transition-colors"
        >
          Share insight
        </button>
      )}
    </div>
  );
};