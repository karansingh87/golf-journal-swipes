import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationPillsProps {
  sections: { type: string, title: string }[];
  activeSection: string;
  onSectionClick: (sectionType: string) => void;
}

const NavigationPills = ({ sections, activeSection, onSectionClick }: NavigationPillsProps) => {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleNavScroll = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    if (navRef.current) {
      setShowLeftScroll(navRef.current.scrollLeft > 0);
      setShowRightScroll(
        navRef.current.scrollLeft < 
        navRef.current.scrollWidth - navRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    if (navRef.current) {
      const element = navRef.current;
      element.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => element.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <div className="relative bg-background/80 backdrop-blur-sm">
      {showLeftScroll && (
        <button 
          onClick={() => handleNavScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border border-border/50"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      
      <div 
        ref={navRef}
        className="flex gap-3 px-6 py-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sections.map(({ type, title }) => (
          <button
            key={type}
            onClick={() => onSectionClick(type)}
            className={cn(
              "px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all duration-200",
              "min-w-[120px] h-10 flex items-center justify-center",
              "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]",
              "bg-zinc-100 text-zinc-500 border border-zinc-200",
              "hover:bg-zinc-950 hover:text-white hover:border-transparent hover:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2)]",
              activeSection === type && "font-medium"
            )}
          >
            {title}
          </button>
        ))}
      </div>

      {showRightScroll && (
        <button 
          onClick={() => handleNavScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border border-border/50"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

export default NavigationPills;