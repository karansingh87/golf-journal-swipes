import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import NavigationTabs from "./analysis/NavigationTabs";
import AnalysisSections from "./analysis/AnalysisSections";
import ProgressIndicator from "./analysis/ProgressIndicator";

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

const SECTIONS = [
  { id: 'session_story', label: 'Session Story' },
  { id: 'breakthroughs', label: 'Breakthroughs' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'patterns_and_potential', label: 'Patterns & Potential' },
  { id: 'key_takeaway', label: 'Key Takeaway' }
] as const;

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

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
    console.log('Parsed analysis:', parsedAnalysis);

    // Handle insufficient data case
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
      if (!scrollAreaRef.current || isScrolling) return;

      const scrollArea = scrollAreaRef.current;
      const scrollPosition = scrollArea.scrollTop;
      const viewportHeight = scrollArea.clientHeight;
      
      // Find the section that takes up most of the viewport
      let maxVisibleSection = 0;
      let maxVisibleHeight = 0;

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          maxVisibleSection = index;
        }
      });

      if (!isScrolling) {
        setCurrentSection(maxVisibleSection);
      }
    };

    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }
  }, [isScrolling]);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (!ref || !scrollAreaRef.current) return;

    setIsScrolling(true);
    setCurrentSection(index);

    const scrollArea = scrollAreaRef.current;
    const targetPosition = ref.offsetTop - 80;

    scrollArea.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-300px)]">
      <NavigationTabs 
        sections={SECTIONS}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />

      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 px-6"
      >
        <AnalysisSections 
          sections={parsedAnalysis.sections}
          sectionRefs={sectionRefs}
        />
      </ScrollArea>

      <ProgressIndicator currentSection={currentSection} />
    </div>
  );
};

export default AnalysisTab;