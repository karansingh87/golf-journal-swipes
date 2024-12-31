import { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Plus, Minus } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  content?: string | string[];
  className?: string;
  isOverview?: boolean;
  index?: number;
  defaultExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  summary?: string;
}

const AnalysisCard = ({ 
  title, 
  content, 
  className, 
  isOverview = false, 
  index = 0,
  defaultExpanded = false,
  onExpand,
  summary
}: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.(newExpandedState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn(
        "border rounded-2xl transition-all duration-200 hover:shadow-card-light", 
        isOverview ? "border-zinc-800 bg-zinc-800" : "border-[#E5E7EB] bg-[#F8F9FA]",
        className
      )}>
        <CardHeader 
          className={cn(
            "cursor-pointer select-none py-4",
            !isOverview && "hover:bg-zinc-100 rounded-2xl"
          )}
          onClick={!isOverview ? handleToggle : undefined}
        >
          <div className="flex items-center justify-between">
            <CardTitle className={cn(
              "text-xl font-semibold",
              isOverview ? "text-white" : "text-zinc-800"
            )}>
              {title}
            </CardTitle>
            {!isOverview && (
              isExpanded ? 
                <Minus className="h-5 w-5 text-zinc-600 ml-auto" /> : 
                <Plus className="h-5 w-5 text-zinc-600 ml-auto" />
            )}
          </div>
          {!isExpanded && !isOverview && summary && (
            <p className="text-sm text-zinc-600 mt-1">{summary}</p>
          )}
        </CardHeader>
        {(isExpanded || isOverview) && (
          <CardContent>
            {typeof content === 'string' ? (
              <ReactMarkdown
                className={cn(
                  "prose max-w-none",
                  isOverview ? "text-white/90" : "text-zinc-700"
                )}
                components={{
                  p: ({ children }) => (
                    <p className="text-base leading-relaxed mb-4 last:mb-0 max-w-[65ch]">
                      {children}
                    </p>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 mb-3">
                      <span className={cn(
                        "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                        isOverview ? "bg-white/80" : "bg-zinc-400"
                      )} />
                      <span className="text-base leading-relaxed">{children}</span>
                    </li>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none pl-0 space-y-2 mb-4 last:mb-0">
                      {children}
                    </ul>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <ul className="list-none pl-0 space-y-3">
                {content?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={cn(
                      "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                      isOverview ? "bg-white/80" : "bg-zinc-400"
                    )} />
                    <ReactMarkdown
                      className={cn(
                        "prose max-w-none",
                        isOverview ? "text-white/90" : "text-zinc-700"
                      )}
                      components={{
                        p: ({ children }) => (
                          <p className="text-base leading-relaxed mb-0 max-w-[65ch]">
                            {children}
                          </p>
                        ),
                      }}
                    >
                      {item}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default AnalysisCard;