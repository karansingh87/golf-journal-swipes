import AnalysisCard from "./AnalysisCard";

interface AnalysisSection {
  title: string;
  content?: string | string[];
}

interface AnalysisSectionsProps {
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
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const AnalysisSections = ({ session_analysis, sectionRefs }: AnalysisSectionsProps) => {
  return (
    <div className="space-y-6 py-6">
      {/* Overview Section */}
      <div ref={el => sectionRefs.current[0] = el} id="overview">
        <AnalysisCard
          title={session_analysis.overview.title}
          content={session_analysis.overview.content}
          isOverview={true}
        />
      </div>

      {/* Breakthroughs Section */}
      <div ref={el => sectionRefs.current[1] = el} id="breakthroughs">
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
      <div ref={el => sectionRefs.current[2] = el} id="opportunities">
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
      <div ref={el => sectionRefs.current[3] = el} id="mental">
        <AnalysisCard
          title={session_analysis.mental_game.title}
          content={session_analysis.mental_game.content}
        />
      </div>

      {/* Focus Areas Section */}
      <div ref={el => sectionRefs.current[4] = el} id="focus">
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
      <div ref={el => sectionRefs.current[5] = el} id="closing">
        <AnalysisCard
          title={session_analysis.closing_note.title}
          content={session_analysis.closing_note.content}
        />
      </div>
    </div>
  );
};

export default AnalysisSections;