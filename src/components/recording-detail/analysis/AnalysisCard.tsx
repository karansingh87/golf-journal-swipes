import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface AnalysisCardProps {
  title: string;
  content?: string | string[];
  className?: string;
  isOverview?: boolean;
  index?: number;
}

const AnalysisCard = ({ title, content, className, isOverview = false, index = 0 }: AnalysisCardProps) => (
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
              p: ({ children }) => <p className="text-base mb-2 last:mb-0">{children}</p>,
              li: ({ children }) => (
                <li className="flex items-start gap-2 mb-2">
                  <span className={cn(
                    "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                    isOverview ? "bg-white/80" : "bg-golf-gray-text-secondary"
                  )} />
                  <span className="text-base">{children}</span>
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
                  "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                  isOverview ? "bg-white/80" : "bg-golf-gray-text-secondary"
                )} />
                <ReactMarkdown
                  className={cn(
                    "prose max-w-none",
                    isOverview ? "text-white/90" : "text-golf-gray-text-secondary"
                  )}
                  components={{
                    p: ({ children }) => <p className="text-base mb-0">{children}</p>,
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

export default AnalysisCard;