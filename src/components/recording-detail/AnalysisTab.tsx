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
  <Card className={cn("border border-border/50 backdrop-blur-sm", className)}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {typeof content === 'string' ? (
        <ReactMarkdown
          className="prose prose-sm max-w-none text-muted-foreground"
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
                className="prose prose-sm max-w-none text-muted-foreground"
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
        <p className="text-muted-foreground">No analysis available for this session.</p>
      </div>
    );
  }

  let parsedAnalysis: AnalysisData;
  try {
    parsedAnalysis = JSON.parse(analysis).session_analysis;
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">Unable to load analysis. Invalid data format.</p>
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
          className="bg-[#F8F9FC] dark:bg-slate-900"
        />

        {/* Breakthroughs Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.breakthroughs.key_discoveries.title}
            content={parsedAnalysis.breakthroughs.key_discoveries.content}
            className="bg-[#F2FCE2] text-[#2B5F1E]"
          />
          <ContentCard
            title={parsedAnalysis.breakthroughs.working_elements.title}
            content={parsedAnalysis.breakthroughs.working_elements.content}
            className="bg-[#E5F6FF] text-[#0A558C]"
          />
        </div>

        {/* Growth Opportunities Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.growth_opportunities.primary_focus.title}
            content={parsedAnalysis.growth_opportunities.primary_focus.content}
            className="bg-[#FEF7CD] text-[#915930]"
          />
          <ContentCard
            title={parsedAnalysis.growth_opportunities.technical_deep_dive.title}
            content={parsedAnalysis.growth_opportunities.technical_deep_dive.content}
            className="bg-[#F8E5FF] text-[#6941C6]"
          />
        </div>

        {/* Mental Game Section */}
        <ContentCard
          title={parsedAnalysis.mental_game.title}
          content={parsedAnalysis.mental_game.content}
          className="bg-[#FFF4ED] text-[#C4320A]"
        />

        {/* Focus Areas Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={parsedAnalysis.focus_areas.next_session.title}
            content={parsedAnalysis.focus_areas.next_session.content}
            className="bg-[#EEF4FF] text-[#3538CD]"
          />
          <ContentCard
            title={parsedAnalysis.focus_areas.long_term.title}
            content={parsedAnalysis.focus_areas.long_term.content}
            className="bg-[#F0F9FF] text-[#026AA2]"
          />
        </div>

        {/* Closing Note Section */}
        <ContentCard
          title={parsedAnalysis.closing_note.title}
          content={parsedAnalysis.closing_note.content}
          className="bg-[#F8F9FC] dark:bg-slate-900"
        />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;