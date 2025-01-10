import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Lock } from "lucide-react";
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
  isPublicView = false,
}: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const navigate = useNavigate();
  const session = useSession();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(!isExpanded);
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="text-sm leading-normal font-sans text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm leading-normal font-sans text-muted-foreground">{content}</p>;
  };

  const renderSignUpPrompt = () => {
    if (!isPublicView || isOverview || session) return null;
    
    return (
      <div className="mt-4">
        <Button 
          onClick={() => navigate('/signup')}
          className="w-full bg-golf-green text-white hover:bg-golf-green/90"
        >
          Sign up to view more
        </Button>
      </div>
    );
  };

  const renderContentWithFade = () => {
    if (!isPublicView || isOverview || session) {
      return renderContent();
    }

    return (
      <div className="relative">
        <div className="max-h-24 overflow-hidden">
          {renderContent()}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="bg-white rounded-full p-2 shadow-md">
              <Lock className="w-4 h-4 text-golf-gray-light" />
            </div>
          </div>
        </div>
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
          {renderContentWithFade()}
        </div>
        {isExpanded && renderSignUpPrompt()}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;