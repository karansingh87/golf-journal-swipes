import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface AnalysisTabProps {
  analysis: string | null;
}

interface AnalysisContent {
  session_analysis: {
    overview: {
      title: string;
      content: string;
    };
    breakthroughs: {
      title: string;
      key_discoveries: {
        title: string;
        content: string[];
      };
      working_elements: {
        title: string;
        content: string[];
      };
    };
    growth_opportunities: {
      title: string;
      primary_focus: {
        title: string;
        content: string[];
      };
      technical_deep_dive: {
        title: string;
        content: string[];
      };
    };
    mental_game: {
      title: string;
      content: string[];
    };
    focus_areas: {
      title: string;
      next_session: {
        title: string;
        content: string[];
      };
      long_term: {
        title: string;
        content: string[];
      };
    };
    closing_note: {
      title: string;
      content: string;
    };
  };
}

const ContentCard = ({ title, content, className }: { 
  title: string; 
  content: string | string[];
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

  let parsedAnalysis: AnalysisContent;
  try {
    // Remove markdown code block markers if present
    const cleanJson = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-muted-foreground">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  const { session_analysis: data } = parsedAnalysis;

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-6 p-6">
        {/* Overview Section */}
        <ContentCard
          title={data.overview.title}
          content={data.overview.content}
          className="bg-[#F8F9FC] dark:bg-slate-900"
        />

        {/* Breakthroughs Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.breakthroughs.key_discoveries.title}
            content={data.breakthroughs.key_discoveries.content}
            className="bg-[#F2FCE2] text-[#2B5F1E] dark:bg-[#1E3A14] dark:text-[#A7E777]"
          />
          <ContentCard
            title={data.breakthroughs.working_elements.title}
            content={data.breakthroughs.working_elements.content}
            className="bg-[#E5F6FF] text-[#0A558C] dark:bg-[#0A3A5C] dark:text-[#7CC7FF]"
          />
        </div>

        {/* Growth Opportunities Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.growth_opportunities.primary_focus.title}
            content={data.growth_opportunities.primary_focus.content}
            className="bg-[#FEF7CD] text-[#915930] dark:bg-[#4D3019] dark:text-[#FFD584]"
          />
          <ContentCard
            title={data.growth_opportunities.technical_deep_dive.title}
            content={data.growth_opportunities.technical_deep_dive.content}
            className="bg-[#F8E5FF] text-[#6941C6] dark:bg-[#3B2473] dark:text-[#C4A7FF]"
          />
        </div>

        {/* Mental Game Section */}
        <ContentCard
          title={data.mental_game.title}
          content={data.mental_game.content}
          className="bg-[#FFF4ED] text-[#C4320A] dark:bg-[#6B1C05] dark:text-[#FFB599]"
        />

        {/* Focus Areas Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.focus_areas.next_session.title}
            content={data.focus_areas.next_session.content}
            className="bg-[#EEF4FF] text-[#3538CD] dark:bg-[#1E1F73] dark:text-[#A5A7FF]"
          />
          <ContentCard
            title={data.focus_areas.long_term.title}
            content={data.focus_areas.long_term.content}
            className="bg-[#F0F9FF] text-[#026AA2] dark:bg-[#013B5C] dark:text-[#7CD3FF]"
          />
        </div>

        {/* Closing Note Section */}
        <ContentCard
          title={data.closing_note.title}
          content={data.closing_note.content}
          className="bg-[#F8F9FC] dark:bg-slate-900"
        />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;