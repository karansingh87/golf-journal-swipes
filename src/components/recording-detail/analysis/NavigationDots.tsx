import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationDotsProps {
  totalSections: number;
  currentSection: number;
  onDotClick: (index: number) => void;
}

const NavigationDots = ({ totalSections, currentSection, onDotClick }: NavigationDotsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-4 py-2"
    >
      <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border/50">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full mx-1 transition-all duration-200",
              currentSection === index 
                ? "bg-golf-green scale-125" 
                : "bg-muted hover:bg-muted-foreground"
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NavigationDots;