import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { LucideIcon } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  className?: string;
}

const AnalysisCard = ({ title, content, icon: Icon, className }: AnalysisCardProps) => (
  <Card className={cn(
    "h-full transition-all duration-200 hover:shadow-lg",
    "border border-zinc-200/50 backdrop-blur-sm",
    "hover:border-zinc-300/50",
    "dark:border-zinc-800/50 dark:hover:border-zinc-700/50",
    "bg-white dark:bg-zinc-900",
    className
  )}>
    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <CardTitle className="text-lg font-semibold text-golf.gray.text.primary dark:text-white">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof content === 'string' ? (
        <ReactMarkdown
          className="prose prose-zinc prose-sm max-w-none text-golf.gray.text.secondary dark:text-zinc-300"
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
                className="prose prose-zinc prose-sm max-w-none text-golf.gray.text.secondary dark:text-zinc-300"
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

export default AnalysisCard;