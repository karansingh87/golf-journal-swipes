import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentSection: number;
}

const ProgressIndicator = ({ currentSection }: ProgressIndicatorProps) => (
  <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-2 hidden lg:flex flex-col">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          currentSection === i ? "bg-golf-green scale-125" : "bg-golf-gray-light/30"
        )}
      />
    ))}
  </div>
);

export default ProgressIndicator;