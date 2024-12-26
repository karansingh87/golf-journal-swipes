import AnalysisCard from "./AnalysisCard";

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface AnalysisSectionsProps {
  sections: AnalysisSection[];
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
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

const AnalysisSections = ({ sections, sectionRefs }: AnalysisSectionsProps) => {
  return (
    <div className="space-y-6 py-6">
      {sections.map((section, index) => (
        <div
          key={section.type}
          ref={el => sectionRefs.current[index] = el}
          id={section.type}
        >
          <AnalysisCard
            title={getTitleFromType(section.type)}
            content={section.content}
            isOverview={section.type === 'session_story'}
          />
        </div>
      ))}
    </div>
  );
};

export default AnalysisSections;