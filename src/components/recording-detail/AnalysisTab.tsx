import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface AnalysisTabProps {
  analysis: string | null;
}

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6 py-4">
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-golf-gray-text-primary prose-p:text-golf-gray-text-secondary prose-li:text-golf-gray-text-secondary">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-4 text-golf-gray-text-primary">
                {children}
              </h1>
            ),
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
          {analysis || "No analysis available"}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default AnalysisTab;