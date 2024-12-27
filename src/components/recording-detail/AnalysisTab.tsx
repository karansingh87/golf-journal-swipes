import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import AnalysisCard from "./analysis/AnalysisCard";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisData {
  sections: AnalysisSection[];
}

interface AnalysisTabProps {
  analysis: string | null;
}

const getTitleFromType = (type: string): string => {
  const titles: Record<string, string> = {
    session_story: "Session Story",
    breakthroughs: "Breakthroughs",
    opportunities: "Opportunities",
    patterns_and_potential: "Patterns & Potential",
    key_takeaway: "Key Takeaway",
    quick_note: "Quick Note"
  };
  return titles[type] || type;
};

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToSection = (sectionType: string) => {
    const element = sectionRefs.current[sectionType];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionType = entry.target.getAttribute('data-section-type');
            if (sectionType) {
              setActiveSection(sectionType);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-golf-gray-text-secondary">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);
    console.log('Parsed analysis:', parsedAnalysis);

    // Handle insufficient data case
    if (parsedAnalysis.sections.length === 1 && parsedAnalysis.sections[0].type === 'quick_note') {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="max-w-md text-center space-y-4">
            <h3 className="text-xl font-semibold text-golf-gray-text-primary">Need More Details</h3>
            <div className="text-golf-gray-text-secondary whitespace-pre-line">
              {parsedAnalysis.sections[0].content}
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-[48px] z-40 bg-background/80 backdrop-blur-sm border-b border-border/50 pb-2">
        <div className="relative">
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
            className="flex gap-2 px-6 py-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {parsedAnalysis.sections.map((section) => (
              <button
                key={section.type}
                onClick={() => scrollToSection(section.type)}
                className={cn(
                  "px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors",
                  "border border-border/50 hover:bg-accent",
                  activeSection === section.type
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {getTitleFromType(section.type)}
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
      </div>

      <ScrollArea className="flex-1 px-6 pt-6">
        <div className="space-y-6 pb-32">
          {parsedAnalysis.sections.map((section, index) => (
            <div
              key={section.type}
              ref={el => {
                sectionRefs.current[section.type] = el;
                if (el && observerRef.current) {
                  observerRef.current.observe(el);
                }
              }}
              data-section-type={section.type}
            >
              <AnalysisCard
                title={getTitleFromType(section.type)}
                content={section.content}
                isOverview={section.type === 'session_story'}
                index={index}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnalysisTab;