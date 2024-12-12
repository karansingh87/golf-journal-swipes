import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

interface InsightsTabProps {
  insights: string | null;
}

const InsightsTab = ({ insights }: InsightsTabProps) => {
  useEffect(() => {
    console.log('InsightsTab rendered with insights:', {
      hasInsights: !!insights,
      insightsLength: insights?.length,
      previewContent: insights?.substring(0, 100) + '...'
    });
  }, [insights]);

  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6 py-4">
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-golf-gray-text-primary prose-p:text-golf-gray-text-secondary prose-li:text-golf-gray-text-secondary">
        <ReactMarkdown
          components={{
            h1: ({ children }) => {
              console.log('Rendering h1:', children);
              return (
                <h1 className="text-2xl font-bold mb-4 text-golf-gray-text-primary">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-3 mt-6 text-golf-gray-text-primary">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium mb-2 mt-4 text-golf-gray-text-primary">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 space-y-2 list-disc list-inside">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 space-y-2 list-decimal list-inside">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">
                {children}
              </li>
            ),
          }}
        >
          {insights || "No insights available"}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default InsightsTab;