import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface AnalysisTabProps {
  analysis: string | null;
}

const AnalysisTab = ({ analysis }: AnalysisTabProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)] px-6">
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-6 text-golf-gray-text-primary">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-4 mt-8 text-golf-gray-text-primary">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium mb-3 mt-6 text-golf-gray-text-primary">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed text-golf-gray-text-secondary">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-6 space-y-2 list-disc list-outside ml-4 text-golf-gray-text-secondary">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-6 space-y-2 list-decimal list-outside ml-4 text-golf-gray-text-secondary">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed pl-2">
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