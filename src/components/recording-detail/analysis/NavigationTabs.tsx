import { cn } from "@/lib/utils";

interface NavigationTabsProps {
  sections: readonly { id: string; label: string; }[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const NavigationTabs = ({ sections, currentSection, onSectionClick }: NavigationTabsProps) => {
  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="flex gap-2 px-6 py-2 overflow-x-auto scrollbar-none">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300",
              currentSection === index
                ? "bg-golf-green text-white scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;