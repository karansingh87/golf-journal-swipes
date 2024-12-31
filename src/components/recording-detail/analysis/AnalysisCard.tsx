import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRandomGradient } from '@/components/trends/utils/patternColors';

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
  isOverview,
  index,
  defaultExpanded = false,
  onExpand,
  summary
}: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const gradient = getRandomGradient();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(!isExpanded);
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-4 space-y-2">
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return content;
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-300",
        isOverview && `bg-gradient-to-br ${gradient.from} ${gradient.to}`,
        !isOverview && "bg-white/80"
      )}
      onClick={handleToggle}
    >
      <div className="p-6">
        <div className="flex items-center justify-between cursor-pointer">
          <h3 className={cn(
            "font-semibold",
            isOverview ? "text-xl" : "text-lg"
          )}>
            {title}
          </h3>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isExpanded && "transform rotate-180"
            )}
          />
        </div>
        
        <div className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "mt-4" : "mt-0 h-0"
        )}>
          <div className="text-golf-gray-text-secondary whitespace-pre-line">
            {renderContent()}
          </div>
        </div>
        
        {!isExpanded && summary && (
          <p className="mt-2 text-sm text-golf-gray-text-secondary">
            {summary}
          </p>
        )}
      </div>
    </Card>
  );
};

export default AnalysisCard;