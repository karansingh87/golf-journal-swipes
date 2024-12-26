import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import NavigationTabs from "./analysis/NavigationTabs";
import AnalysisSections from "./analysis/AnalysisSections";
import ProgressIndicator from "./analysis/ProgressIndicator";

interface AnalysisTabProps {
  analysis: string | null;
}

interface AnalysisSection {
  title: string;
  content?: string | string[];
}

interface AnalysisData {
  session_analysis: {
    overview: AnalysisSection;
    breakthroughs: {
      title: string;
      key_discoveries: AnalysisSection;
      working_elements: AnalysisSection;
    };
    growth_opportunities: {
      title: string;
      primary_focus: AnalysisSection;
      technical_deep_dive: AnalysisSection;
    };
    mental_game: AnalysisSection;
    focus_areas: {
      title: string;
      next_session: AnalysisSection;
      long_term: AnalysisSection;
    };
    closing_note: AnalysisSection;
  };
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'breakthroughs', label: 'Breakthroughs' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'mental', label: 'Mental Game' },
  { id: 'focus', label: 'Focus Areas' },
  { id: 'closing', label: 'Closing' }
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

      const scrollPosition = scrollAreaRef.current.scrollTop;
      let newSection = 0;

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        if (ref.offsetTop - 100 <= scrollPosition) {
          newSection = index;
        }
      });

      setCurrentSection(newSection);
    };

    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: ref.offsetTop - 80,
        behavior: 'smooth'
      });
      setCurrentSection(index);
    }
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
          session_analysis={parsedAnalysis.session_analysis}
          sectionRefs={sectionRefs}
        />
      </ScrollArea>

      <ProgressIndicator currentSection={currentSection} />
    </div>
  );
};

export default AnalysisTab;