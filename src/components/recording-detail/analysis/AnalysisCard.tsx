import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  isOverview?: boolean;
  index: number;
  defaultExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  summary?: string;
}

const AnalysisCard = ({
  title,
  content,
  isOverview = false,
  index,
  defaultExpanded = false,
  onExpand,
  summary,
}: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(!isExpanded);
  };

  const shouldUseBullets = (title: string) => {
    return ['Mindset', 'Breakthroughs', 'Patterns & Potential'].includes(title);
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (shouldUseBullets(title)) {
      // Split the content by sentences and create bullet points
      const sentences = content
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

      return (
        <ul className="list-disc list-inside space-y-2">
          {sentences.map((sentence, idx) => (
            <li key={idx} className="leading-relaxed">
              {sentence}.
            </li>
          ))}
        </ul>
      );
    }

    return <p>{content}</p>;
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer relative",
        isOverview && "bg-gradient-to-r from-purple-50 to-indigo-100",
        !isOverview && "bg-white border"
      )}
      onClick={handleToggle}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-gray-500 transition-transform duration-200",
              isExpanded && "transform rotate-180"
            )}
          />
        </div>
        <div
          className={cn(
            "overflow-hidden transition-all duration-200",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-16 opacity-80"
          )}
        >
          <div className="text-golf-gray-text-secondary">
            {isExpanded ? renderContent() : summary || (Array.isArray(content) ? content[0] : content)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;