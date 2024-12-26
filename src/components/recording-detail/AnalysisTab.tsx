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

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (!section) return;

    // Get the section's position relative to the viewport
    const sectionRect = section.getBoundingClientRect();
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    // Calculate the scroll position needed to center the section
    const scrollPosition = scrollArea.scrollTop + sectionRect.top - 100; // 100px offset for header

    // Scroll to the section
    scrollArea.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });

    setCurrentSection(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollAreaRef.current) return;

      const scrollArea = scrollAreaRef.current;
      const sections = sectionRefs.current;

      // Find which section is most visible in the viewport
      let mostVisibleSection = 0;
      let maxVisibility = 0;

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          mostVisibleSection = index;
        }
      });

      setCurrentSection(mostVisibleSection);
    };

    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

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