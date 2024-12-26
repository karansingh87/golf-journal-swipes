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
    mental_game: "Mental Game Insights",
    next_session: "Next Session Opportunity",
    long_term: "Long-Term Potential",
    closing_note: "Closing Note"
  };
  return titles[type] || type;
};

const AnalysisSections = ({ sections, sectionRefs }: AnalysisSectionsProps) => {
  return (
    <div className="space-y-6 py-6">
      {/* Overview Section */}
      <div ref={el => sectionRefs.current[0] = el} id="overview">
        <AnalysisCard
          title={getTitleFromType(sections[0].type)}
          content={sections[0].content}
          isOverview={true}
        />
      </div>

      {/* Key Discoveries & Working Elements */}
      <div ref={el => sectionRefs.current[1] = el} id="discoveries" className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={getTitleFromType(sections[1].type)}
          content={sections[1].content}
        />
        <AnalysisCard
          title={getTitleFromType(sections[2].type)}
          content={sections[2].content}
        />
      </div>

      {/* Primary Focus & Technical Deep-Dive */}
      <div ref={el => sectionRefs.current[3] = el} id="focus" className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={getTitleFromType(sections[3].type)}
          content={sections[3].content}
        />
        <AnalysisCard
          title={getTitleFromType(sections[4].type)}
          content={sections[4].content}
        />
      </div>

      {/* Mental Game */}
      <div ref={el => sectionRefs.current[5] = el} id="mental">
        <AnalysisCard
          title={getTitleFromType(sections[5].type)}
          content={sections[5].content}
        />
      </div>

      {/* Next Session & Long Term */}
      <div ref={el => sectionRefs.current[6] = el} id="next" className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={getTitleFromType(sections[6].type)}
          content={sections[6].content}
        />
        <AnalysisCard
          title={getTitleFromType(sections[7].type)}
          content={sections[7].content}
        />
      </div>

      {/* Closing Note */}
      <div ref={el => sectionRefs.current[8] = el} id="closing">
        <AnalysisCard
          title={getTitleFromType(sections[8].type)}
          content={sections[8].content}
        />
      </div>
    </div>
  );
};

export default AnalysisSections;