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
    <div className="relative h-full flex flex-col p-8">
      {/* Premium texture overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Category Label */}
        <div>
          <span className={cn(
            "px-2.5 py-0.5 text-xs tracking-wide text-muted-foreground/80 uppercase",
            "bg-white rounded-full border",
            borderClass
          )}>
            {type}
          </span>
        </div>

        {/* Title and Content with consistent spacing */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};