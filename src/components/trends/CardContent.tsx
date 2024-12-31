import { cn } from "@/lib/utils";

interface CardContentProps {
  type: string;
  title: string;
  content: string;
  gradientClasses: string;
  borderClass: string;
}

export const CardContent = ({
  type,
  title,
  content,
  gradientClasses,
  borderClass,
}: CardContentProps) => {
  return (
    <div className="relative h-full flex flex-col p-6">
      {/* Premium texture overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
      
      {/* Watermark */}
      <div className="absolute bottom-3 right-3 opacity-10">
        <span className="font-logo text-lg tracking-[-0.03em]">
          golflog
        </span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Category Label */}
        <div>
          <span className={cn(
            "px-2.5 py-0.5 text-xs font-medium tracking-wide text-muted-foreground uppercase",
            "bg-white rounded-full border",
            borderClass
          )}>
            {type}
          </span>
        </div>

        {/* Title and Content with consistent spacing */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-sm md:text-base font-medium text-muted-foreground leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};