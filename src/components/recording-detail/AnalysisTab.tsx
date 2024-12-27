import { useState, useRef, useEffect } from "react";
import AnalysisCard from "./analysis/AnalysisCard";
import NavigationPills from "./analysis/NavigationPills";
import ScrollableContent from "./analysis/ScrollableContent";

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
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToSection = (sectionType: string) => {
    const element = sectionRefs.current[sectionType];
    if (element) {
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

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

  const sections = parsedAnalysis.sections.map(section => ({
    type: section.type,
    title: getTitleFromType(section.type)
  }));

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-[48px] z-40 bg-background/80 backdrop-blur-sm">
        <NavigationPills
          sections={sections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      </div>

      <ScrollableContent>
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
      </ScrollableContent>
    </div>
  );
};

export default AnalysisTab;