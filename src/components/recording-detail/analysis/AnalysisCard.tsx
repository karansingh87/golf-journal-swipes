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
        isOverview ? "bg-gradient-to-r from-[#defaf2] to-[#defaf3] border-transparent" : "border-[#E5E7EB] bg-white",
        className
      )}>
        <CardHeader 
          className={cn(
            "cursor-pointer select-none py-4",
            !isOverview && !isExpanded && "hover:bg-zinc-50 rounded-2xl"
          )}
          onClick={!isOverview ? handleToggle : undefined}
        >
          <div className="flex items-center justify-between">
            <CardTitle className={cn(
              "text-xl font-semibold",
              isOverview ? "text-zinc-800" : "text-golf-gray-text-primary"
            )}>
              {title}
            </CardTitle>
            {!isOverview && (
              isExpanded ? 
                <Minus className="h-5 w-5 text-golf-gray-text-secondary ml-auto" /> : 
                <Plus className="h-5 w-5 text-golf-gray-text-secondary ml-auto" />
            )}
          </div>
          {!isExpanded && !isOverview && summary && (
            <div className="relative mt-1">
              <div className="max-h-[48px] overflow-hidden">
                <p className="text-[15px] text-golf-gray-text-secondary">{summary}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white to-transparent" />
            </div>
          )}
        </CardHeader>
        {(isExpanded || isOverview) && (
          <CardContent>
            {typeof content === 'string' ? (
              <ReactMarkdown
                className={cn(
                  "prose max-w-none",
                  isOverview ? "text-zinc-800" : "text-golf-gray-text-secondary"
                )}
                components={{
                  p: ({ children }) => (
                    <p className="text-[15px] leading-relaxed mb-4 last:mb-0 max-w-[65ch]">
                      {children}
                    </p>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 mb-3">
                      <span className={cn(
                        "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                        isOverview ? "bg-zinc-800" : "bg-golf-gray-text-secondary"
                      )} />
                      <span className="text-[15px] leading-relaxed">{children}</span>
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
                      isOverview ? "bg-zinc-800" : "bg-golf-gray-text-secondary"
                    )} />
                    <ReactMarkdown
                      className={cn(
                        "prose max-w-none",
                        isOverview ? "text-zinc-800" : "text-golf-gray-text-secondary"
                      )}
                      components={{
                        p: ({ children }) => (
                          <p className="text-[15px] leading-relaxed mb-0 max-w-[65ch]">
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