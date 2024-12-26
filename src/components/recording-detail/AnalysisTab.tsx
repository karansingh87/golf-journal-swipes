import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import AnalysisCard from "./analysis/AnalysisCard";
import NavigationDots from "./analysis/NavigationDots";

interface AnalysisTabProps {
  analysis: string | null;
}

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisData {
  sections: AnalysisSection[];
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
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);

    if (parsedAnalysis.sections.length === 1 && parsedAnalysis.sections[0].type === 'quick_note') {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
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
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollAreaRef.current) return;

      const scrollArea = scrollAreaRef.current;
      const viewportHeight = scrollArea.clientHeight;
      
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const sectionTop = rect.top;
        const threshold = viewportHeight * 0.3; // Section is considered active when it's in the top 30% of viewport

        if (sectionTop <= threshold) {
          setCurrentSection(index);
        }
      });
    };

    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (!ref || !scrollAreaRef.current) return;

    const scrollArea = scrollAreaRef.current;
    const targetPosition = ref.offsetTop - 80;

    scrollArea.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    setCurrentSection(index);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-300px)]">
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
        <div className="space-y-6 py-6">
          {parsedAnalysis.sections.map((section, index) => (
            <div 
              key={section.type}
              ref={el => sectionRefs.current[index] = el}
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
      
      <NavigationDots
        totalSections={parsedAnalysis.sections.length}
        currentSection={currentSection}
        onDotClick={scrollToSection}
      />
    </div>
  );
};

export default AnalysisTab;