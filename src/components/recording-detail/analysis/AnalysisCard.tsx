import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  className?: string;
}

const AnalysisCard = ({ title, content, icon: Icon, className }: AnalysisCardProps) => (
  <Card className={cn(
    "h-full transition-all duration-200",
    "bg-white dark:bg-zinc-900",
    "border border-zinc-200/50 hover:border-zinc-300/50",
    "shadow-sm hover:shadow-md",
    className
  )}>
    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
      <Icon className="h-5 w-5 text-golf-gray-text-secondary" />
      <CardTitle className="text-xl font-semibold text-golf-gray-text-primary">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof content === 'string' ? (
        <ReactMarkdown
          className="prose prose-zinc prose-sm max-w-none text-golf-gray-text-secondary"
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0 text-golf-gray-text-secondary">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-golf-gray-text-primary">{children}</strong>,
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <ul className="space-y-3">
          {content?.map((item, index) => (
            <li key={index}>
              <ReactMarkdown
                className="prose prose-zinc prose-sm max-w-none text-golf-gray-text-secondary"
                components={{
                  p: ({ children }) => <p className="mb-0 text-golf-gray-text-secondary">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-golf-gray-text-primary">{children}</strong>,
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

export default AnalysisCard;