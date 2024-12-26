import { Brain, Target, Info, Square, SquareCheck } from "lucide-react";
import AnalysisCard from "./AnalysisCard";

interface SectionData {
  title: string;
  content: string | {
    title: string;
    content: string[];
  }[];
}

interface AnalysisSectionProps {
  data: {
    overview: { title: string; content: string };
    breakthroughs: {
      title: string;
      key_discoveries: { title: string; content: string[] };
      working_elements: { title: string; content: string[] };
    };
    growth_opportunities: {
      title: string;
      primary_focus: { title: string; content: string[] };
      technical_deep_dive: { title: string; content: string[] };
    };
    mental_game: { title: string; content: string[] };
    focus_areas: {
      title: string;
      next_session: { title: string; content: string[] };
      long_term: { title: string; content: string[] };
    };
    closing_note: { title: string; content: string };
  };
}

const AnalysisSection = ({ data }: AnalysisSectionProps) => {
  return (
    <div className="space-y-6 pb-8">
      <AnalysisCard
        title={data.overview.title}
        content={data.overview.content}
        icon={Info}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={data.breakthroughs.key_discoveries.title}
          content={data.breakthroughs.key_discoveries.content}
          icon={SquareCheck}
        />
        <AnalysisCard
          title={data.breakthroughs.working_elements.title}
          content={data.breakthroughs.working_elements.content}
          icon={Square}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={data.growth_opportunities.primary_focus.title}
          content={data.growth_opportunities.primary_focus.content}
          icon={Target}
        />
        <AnalysisCard
          title={data.growth_opportunities.technical_deep_dive.title}
          content={data.growth_opportunities.technical_deep_dive.content}
          icon={Target}
        />
      </div>

      <AnalysisCard
        title={data.mental_game.title}
        content={data.mental_game.content}
        icon={Brain}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <AnalysisCard
          title={data.focus_areas.next_session.title}
          content={data.focus_areas.next_session.content}
          icon={Square}
        />
        <AnalysisCard
          title={data.focus_areas.long_term.title}
          content={data.focus_areas.long_term.content}
          icon={Square}
        />
      </div>

      <AnalysisCard
        title={data.closing_note.title}
        content={data.closing_note.content}
        icon={Info}
      />
    </div>
  );
};

export default AnalysisSection;