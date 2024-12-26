import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const ContentCard = ({ title, content, className, isOverview = false, index = 0 }: { 
  title: string; 
  content?: string | string[];
  className?: string;
  isOverview?: boolean;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Card className={cn(
      "border rounded-2xl transition-all duration-200 hover:shadow-card-light transform hover:-translate-y-1", 
      isOverview ? "border-golf-green bg-golf-green" : "border-[#E5E7EB] bg-white",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className={cn(
          "text-xl font-semibold",
          isOverview ? "text-white" : "text-golf-gray-text-primary"
        )}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {typeof content === 'string' ? (
          <ReactMarkdown
            className={cn(
              "prose max-w-none",
              isOverview ? "text-white/90" : "text-golf-gray-text-secondary"
            )}
            components={{
              p: ({ children }) => <p className="text-sm mb-2 last:mb-0">{children}</p>,
              li: ({ children }) => (
                <li className="flex items-start gap-2 mb-2">
                  <span className={cn(
                    "mt-1.5 h-1 w-1 rounded-full flex-shrink-0",
                    isOverview ? "bg-white/80" : "bg-golf-gray-text-secondary"
                  )} />
                  <span className="text-sm">{children}</span>
                </li>
              ),
              ul: ({ children }) => <ul className="list-none pl-0 space-y-2">{children}</ul>,
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <ul className="list-none pl-0 space-y-2">
            {content?.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={cn(
                  "mt-1.5 h-1 w-1 rounded-full flex-shrink-0",
                  isOverview ? "bg-white/80" : "bg-golf-gray-text-secondary"
                )} />
                <ReactMarkdown
                  className={cn(
                    "prose max-w-none",
                    isOverview ? "text-white/90" : "text-golf-gray-text-secondary"
                  )}
                  components={{
                    p: ({ children }) => <p className="text-sm mb-0">{children}</p>,
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
  </motion.div>
);

const ProgressIndicator = ({ currentSection }: { currentSection: number }) => (
  <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-2 hidden lg:flex flex-col">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          currentSection === i ? "bg-golf-green scale-125" : "bg-golf-gray-light/30"
        )}
      />
    ))}
  </div>
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
    const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
    parsedAnalysis = JSON.parse(cleanAnalysis);
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] px-6">
        <p className="text-golf-gray-text-secondary">Unable to load analysis. Invalid data format.</p>
      </div>
    );
  }

  const { session_analysis } = parsedAnalysis;

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-6 p-6">
        {/* Overview Section */}
        <ContentCard
          title={session_analysis.overview.title}
          content={session_analysis.overview.content}
          isOverview={true}
          index={0}
        />

        {/* Breakthroughs Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={session_analysis.breakthroughs.key_discoveries.title}
            content={session_analysis.breakthroughs.key_discoveries.content}
            index={1}
          />
          <ContentCard
            title={session_analysis.breakthroughs.working_elements.title}
            content={session_analysis.breakthroughs.working_elements.content}
            index={2}
          />
        </div>

        {/* Growth Opportunities Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={session_analysis.growth_opportunities.primary_focus.title}
            content={session_analysis.growth_opportunities.primary_focus.content}
            index={3}
          />
          <ContentCard
            title={session_analysis.growth_opportunities.technical_deep_dive.title}
            content={session_analysis.growth_opportunities.technical_deep_dive.content}
            index={4}
          />
        </div>

        {/* Mental Game Section */}
        <ContentCard
          title={session_analysis.mental_game.title}
          content={session_analysis.mental_game.content}
          index={5}
        />

        {/* Focus Areas Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <ContentCard
            title={session_analysis.focus_areas.next_session.title}
            content={session_analysis.focus_areas.next_session.content}
            index={6}
          />
          <ContentCard
            title={session_analysis.focus_areas.long_term.title}
            content={session_analysis.focus_areas.long_term.content}
            index={7}
          />
        </div>

        {/* Closing Note Section */}
        <ContentCard
          title={session_analysis.closing_note.title}
          content={session_analysis.closing_note.content}
          index={8}
        />
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;