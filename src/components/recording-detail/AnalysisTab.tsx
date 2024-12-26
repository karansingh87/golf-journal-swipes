import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Brain, Target, Info, Square, SquareCheck } from "lucide-react";

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

const ContentCard = ({ title, content, icon: Icon, className }: { 
  title: string; 
  content: string | string[];
  icon: React.ElementType;
  className?: string;
}) => (
  <Card className={cn(
    "h-full transition-all duration-200 hover:shadow-lg",
    "border border-zinc-200/50 backdrop-blur-sm",
    "hover:border-zinc-300/50",
    "dark:border-zinc-800/50 dark:hover:border-zinc-700/50",
    className
  )}>
    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {typeof content === 'string' ? (
        <ReactMarkdown
          className="prose prose-zinc prose-sm max-w-none text-zinc-600 dark:text-zinc-300"
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
                className="prose prose-zinc prose-sm max-w-none text-zinc-600 dark:text-zinc-300"
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
        <p className="text-zinc-500 dark:text-zinc-400">No analysis available for this session.</p>
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
        <p className="text-zinc-500 dark:text-zinc-400">Unable to load analysis. Invalid data format.</p>
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
          icon={Info}
          className="bg-white/80 dark:bg-zinc-900/80"
        />

        {/* Breakthroughs Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.breakthroughs.key_discoveries.title}
            content={data.breakthroughs.key_discoveries.content}
            icon={SquareCheck}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
          <ContentCard
            title={data.breakthroughs.working_elements.title}
            content={data.breakthroughs.working_elements.content}
            icon={Square}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
        </div>

        {/* Growth Opportunities Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.growth_opportunities.primary_focus.title}
            content={data.growth_opportunities.primary_focus.content}
            icon={Target}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
          <ContentCard
            title={data.growth_opportunities.technical_deep_dive.title}
            content={data.growth_opportunities.technical_deep_dive.content}
            icon={Target}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
        </div>

        {/* Mental Game Section */}
        <ContentCard
          title={data.mental_game.title}
          content={data.mental_game.content}
          icon={Brain}
          className="bg-zinc-50/80 dark:bg-zinc-900/80"
        />

        {/* Focus Areas Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={data.focus_areas.next_session.title}
            content={data.focus_areas.next_session.content}
            icon={Square}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
          <ContentCard
            title={data.focus_areas.long_term.title}
            content={data.focus_areas.long_term.content}
            icon={Square}
            className="bg-zinc-50/80 dark:bg-zinc-900/80"
          />
        </div>

        {/* Closing Note Section */}
        <ContentCard
          title={data.closing_note.title}
          content={data.closing_note.content}
          icon={Info}
          className="bg-white/80 dark:bg-zinc-900/80"
        />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;