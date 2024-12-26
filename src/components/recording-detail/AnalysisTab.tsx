import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
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

const ContentCard = ({ title, content, className }: { 
  title: string; 
  content?: string | string[];
  className?: string;
}) => (
  <Card className={cn(
    "border border-golf-gray-light bg-white", 
    "transition-all duration-200 hover:shadow-card-light",
    className
  )}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold text-golf-gray-text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {typeof content === 'string' ? (
        <ReactMarkdown
          className="prose prose-sm max-w-none text-golf-gray-text-primary"
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <ul className="space-y-2">
          {content?.map((item, index) => (
            <li key={index}>
              <ReactMarkdown
                className="prose prose-sm max-w-none text-golf-gray-text-primary"
                components={{
                  p: ({ children }) => <p className="mb-0">{children}</p>,
                }}
              >
                {item}
              </ReactMarkdown>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    // Remove markdown code block markers if present
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis).session_analysis;
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-6 p-6">
        {/* Overview Section */}
        <ContentCard
          title={parsedAnalysis.overview.title}
          content={parsedAnalysis.overview.content}
        />

        {/* Breakthroughs Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.breakthroughs.key_discoveries.title}
            content={parsedAnalysis.breakthroughs.key_discoveries.content}
          />
          <ContentCard
            title={parsedAnalysis.breakthroughs.working_elements.title}
            content={parsedAnalysis.breakthroughs.working_elements.content}
          />
        </div>

        {/* Growth Opportunities Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.growth_opportunities.primary_focus.title}
            content={parsedAnalysis.growth_opportunities.primary_focus.content}
          />
          <ContentCard
            title={parsedAnalysis.growth_opportunities.technical_deep_dive.title}
            content={parsedAnalysis.growth_opportunities.technical_deep_dive.content}
          />
        </div>

        {/* Mental Game Section */}
        <ContentCard
          title={parsedAnalysis.mental_game.title}
          content={parsedAnalysis.mental_game.content}
        />

        {/* Focus Areas Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.focus_areas.next_session.title}
            content={parsedAnalysis.focus_areas.next_session.content}
          />
          <ContentCard
            title={parsedAnalysis.focus_areas.long_term.title}
            content={parsedAnalysis.focus_areas.long_term.content}
          />
        </div>

        {/* Closing Note Section */}
        <ContentCard
          title={parsedAnalysis.closing_note.title}
          content={parsedAnalysis.closing_note.content}
        />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;