import { format } from "date-fns";
import { ArrowLeft, Lock, Share2, Trash2, Unlock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface AnalysisSection {
  type: string;
  content: string | string[];
}

interface Analysis {
  sections: AnalysisSection[];
}

interface RecordingHeaderProps {
  recording: {
    id: string;
    created_at: string;
    is_public: boolean;
    analysis?: Analysis | null;
  };
  onDelete: () => void;
  onTogglePublic: () => void;
  onShare: () => void;
}

const RecordingHeader = ({ recording, onDelete, onTogglePublic, onShare }: RecordingHeaderProps) => {
  const navigate = useNavigate();
  
  const getHeadline = () => {
    if (!recording.analysis?.sections) return "Golf Session";
    const headlineSection = recording.analysis.sections.find(
      (section) => section.type === "headline"
    );
    if (!headlineSection) return "Golf Session";
    return Array.isArray(headlineSection.content)
      ? headlineSection.content[0]
      : headlineSection.content;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => navigate('/notes')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-golf-gray-text-primary">
              {getHeadline()}
            </h1>
            <p className="text-sm text-golf-gray-text-secondary">
              {format(new Date(recording.created_at), "MMMM d, yyyy")} 
              <span className="mx-1.5 text-[10px]">•</span> 
              {format(new Date(recording.created_at), "h:mm a")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-11">
        <div className="flex items-center gap-1.5 bg-secondary/50 rounded-full px-2 py-0.5">
          <Switch
            checked={recording.is_public}
            onCheckedChange={onTogglePublic}
            className="h-4 w-7"
          />
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {recording.is_public ? (
              <>
                <Unlock className="h-3 w-3" />
                Public
              </>
            ) : (
              <>
                <Lock className="h-3 w-3" />
                Private
              </>
            )}
          </span>
        </div>
        {recording.is_public && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onShare}
            className="h-6 px-2 gap-1"
          >
            <Share2 className="h-3 w-3" />
            <span className="text-xs">Share</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-6 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default RecordingHeader;