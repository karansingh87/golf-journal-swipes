import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface RecordingCardProps {
  recording: {
    id: string;
    audio_url: string;
    transcription: string;
    analysis: string;
    duration: number;
    created_at: string;
    session_type: "course" | "practice";
    user?: {
      display_name?: string | null;
    };
  };
  onEdit?: (recording: any) => void;
  onDelete?: (id: string) => void;
  isEditing?: boolean;
  editedTranscription?: string;
  onEditChange?: (value: string) => void;
  onSave?: (id: string) => Promise<void>;
  onCancelEdit?: () => void;
  defaultExpanded?: boolean;
  isPublicView?: boolean;
}

const RecordingCard = ({
  recording,
  defaultExpanded,
  isPublicView = false,
}: RecordingCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recording/${recording.id}`);
  };

  const getHeadline = (analysis: string | null): string => {
    if (!analysis) return "";
    
    try {
      const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
      const parsedAnalysis = JSON.parse(cleanAnalysis);
      
      const headlineSection = parsedAnalysis.sections?.find(
        (section: any) => section.type === 'headline'
      );
      
      if (headlineSection && typeof headlineSection.content === 'string') {
        return headlineSection.content;
      }
      
      return "";
    } catch (error) {
      const lines = analysis.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        return lines[0].replace(/^#+\s*/, '').trim();
      }
      return "";
    }
  };

  const sessionTypeStyles = {
    course: "bg-[#F2FCE2] text-[#3D691D] border border-[#3D691D]/10",
    practice: "bg-[#D3E4FD] text-[#1D4ED8]/80 border border-[#1D4ED8]/10",
  };

  return (
    <Card 
      onClick={isPublicView ? undefined : handleCardClick}
      className={cn(
        "mb-1 transition-all duration-300 hover:shadow-lg relative",
        "rounded-2xl border border-border/50 backdrop-blur-sm",
        !isPublicView && "cursor-pointer active:scale-[0.99]",
        "bg-white/80 p-4"
      )}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">
                {format(new Date(recording.created_at), "MMM d, yyyy")}
              </span>
              {isPublicView && recording.user?.display_name && (
                <>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500">
                    Shared by {recording.user.display_name}
                  </span>
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(recording.created_at), "h:mm a")}
            </div>
          </div>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium transition-colors",
            sessionTypeStyles[recording.session_type]
          )}>
            {recording.session_type.charAt(0).toUpperCase() + recording.session_type.slice(1)}
          </span>
        </div>
        {recording.analysis && (
          <div className="text-sm text-muted-foreground line-clamp-1">
            {getHeadline(recording.analysis)}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecordingCard;