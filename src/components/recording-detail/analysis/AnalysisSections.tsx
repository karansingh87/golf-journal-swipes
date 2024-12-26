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
    overview: "Overview",
    key_discoveries: "Key Discoveries",
    working_elements: "Working Elements",
    primary_focus: "Primary Focus",
    technical_deep_dive: "Technical Deep-Dive",
    mental_game: "Mental Game",
    next_session: "Next Session",
    long_term: "Long-Term",
    closing_note: "Closing Note"
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
          className={index > 0 && index % 2 === 1 ? "grid gap-4 md:grid-cols-2" : undefined}
        >
          <AnalysisCard
            title={getTitleFromType(section.type)}
            content={section.content}
            isOverview={section.type === 'overview'}
          />
        </div>
      ))}
    </div>
  );
};

export default AnalysisSections;