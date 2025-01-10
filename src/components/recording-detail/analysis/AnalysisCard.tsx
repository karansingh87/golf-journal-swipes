import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  isOverview?: boolean;
  index: number;
  defaultExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  summary?: string;
  isPublicView?: boolean;
}

const AnalysisCard = ({
  title,
  content,
  isOverview = false,
  index,
  defaultExpanded = true,
  onExpand,
  summary,
  isPublicView = false,
}: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const navigate = useNavigate();
  const session = useSession();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(!isExpanded);
  };

  const truncateContent = (text: string): string => {
    const words = text.split(' ');
    if (words.length <= 25) return text;
    return words.slice(0, 25).join(' ') + '...';
  };

  const getRemainingContentEstimate = () => {
    if (Array.isArray(content)) {
      const totalWords = content.join(' ').split(' ').length;
      const remainingWords = totalWords - 25;
      return remainingWords > 0 ? `${remainingWords} more words` : '';
    }
    const totalWords = content.split(' ').length;
    const remainingWords = totalWords - 25;
    return remainingWords > 0 ? `${remainingWords} more words` : '';
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      const displayContent = !isPublicView || isOverview || session 
        ? content 
        : [truncateContent(content.join(' '))];
      
      return (
        <ul className="list-disc list-inside space-y-2">
          {displayContent.map((item, idx) => (
            <li key={idx} className="text-sm leading-normal font-sans text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    const displayText = !isPublicView || isOverview || session 
      ? content 
      : truncateContent(content);
    return <p className="text-sm leading-normal font-sans text-muted-foreground">{displayText}</p>;
  };

  const renderSignUpPrompt = () => {
    if (!isPublicView || isOverview || session) return null;
    const estimate = getRemainingContentEstimate();
    
    return (
      <div className="mt-4 space-y-2">
        {estimate && (
          <p className="text-sm text-muted-foreground italic">
            {estimate} available after sign up
          </p>
        )}
        <Button 
          onClick={() => navigate('/signup')}
          className="w-full bg-golf-green text-white hover:bg-golf-green/90"
        >
          Sign up to view more
        </Button>
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer relative",
        isOverview ? "bg-[#FAF5FF] border-[#FAF5FF]" : "bg-white border"
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
          <div>
            {isExpanded ? renderContent() : (
              <p className="text-sm leading-normal font-sans text-muted-foreground">
                {summary || (Array.isArray(content) 
                  ? truncateContent(content[0]) 
                  : truncateContent(content))}
              </p>
            )}
          </div>
        </div>
        {isExpanded && renderSignUpPrompt()}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;