import { format } from "date-fns";
import { ArrowLeft, Share2, Trash2 } from "lucide-react";
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
    <div className="space-y-4">
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
            <h1 className="text-xl font-semibold text-golf-gray-text-primary">
              {getHeadline()}
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm text-golf-gray-text-secondary">
                {format(new Date(recording.created_at), "MMMM d, yyyy")}
              </span>
              <span className="text-[10px] mx-1.5 text-golf-gray-text-secondary">•</span>
              <span className="text-sm text-golf-gray-text-secondary">
                {format(new Date(recording.created_at), "h:mm a")}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5 bg-golf-gray-text-secondary/5 px-2.5 py-1.5 rounded-full">
                <Switch
                  checked={recording.is_public}
                  onCheckedChange={onTogglePublic}
                  className="h-4 w-7"
                />
                <span className="text-xs font-medium text-golf-gray-text-secondary">
                  {recording.is_public ? "Public" : "Private"}
                </span>
              </div>
              {recording.is_public && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShare}
                  className="h-7 px-2.5 bg-golf-gray-text-secondary/5"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Share</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-7 px-2 ml-auto text-golf-gray-text-secondary/70 hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingHeader;