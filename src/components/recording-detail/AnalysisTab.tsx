import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import AnalysisCard from "./analysis/AnalysisCard";
import ProgressIndicator from "./analysis/ProgressIndicator";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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

  const { session_analysis } = parsedAnalysis;

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
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-300px)]">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex gap-2 px-6 py-2 overflow-x-auto scrollbar-none">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
                currentSection === index
                  ? "bg-golf-green text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 px-6"
      >
        <div className="space-y-6 py-6">
          {/* Overview Section */}
          <div ref={el => sectionRefs.current[0] = el}>
            <AnalysisCard
              title={session_analysis.overview.title}
              content={session_analysis.overview.content}
              isOverview={true}
            />
          </div>

          {/* Breakthroughs Section */}
          <div ref={el => sectionRefs.current[1] = el}>
            <div className="grid gap-4 md:grid-cols-2">
              <AnalysisCard
                title={session_analysis.breakthroughs.key_discoveries.title}
                content={session_analysis.breakthroughs.key_discoveries.content}
              />
              <AnalysisCard
                title={session_analysis.breakthroughs.working_elements.title}
                content={session_analysis.breakthroughs.working_elements.content}
              />
            </div>
          </div>

          {/* Growth Opportunities Section */}
          <div ref={el => sectionRefs.current[2] = el}>
            <div className="grid gap-4 md:grid-cols-2">
              <AnalysisCard
                title={session_analysis.growth_opportunities.primary_focus.title}
                content={session_analysis.growth_opportunities.primary_focus.content}
              />
              <AnalysisCard
                title={session_analysis.growth_opportunities.technical_deep_dive.title}
                content={session_analysis.growth_opportunities.technical_deep_dive.content}
              />
            </div>
          </div>

          {/* Mental Game Section */}
          <div ref={el => sectionRefs.current[3] = el}>
            <AnalysisCard
              title={session_analysis.mental_game.title}
              content={session_analysis.mental_game.content}
            />
          </div>

          {/* Focus Areas Section */}
          <div ref={el => sectionRefs.current[4] = el}>
            <div className="grid gap-4 md:grid-cols-2">
              <AnalysisCard
                title={session_analysis.focus_areas.next_session.title}
                content={session_analysis.focus_areas.next_session.content}
              />
              <AnalysisCard
                title={session_analysis.focus_areas.long_term.title}
                content={session_analysis.focus_areas.long_term.content}
              />
            </div>
          </div>

          {/* Closing Note Section */}
          <div ref={el => sectionRefs.current[5] = el}>
            <AnalysisCard
              title={session_analysis.closing_note.title}
              content={session_analysis.closing_note.content}
            />
          </div>
        </div>
      </ScrollArea>

      <ProgressIndicator currentSection={currentSection} />
    </div>
  );
};

export default AnalysisTab;