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
  };
  onEdit: (recording: any) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editedTranscription: string;
  onEditChange: (value: string) => void;
  onSave: (id: string) => Promise<void>;
  onCancelEdit: () => void;
  defaultExpanded: boolean;
}

const RecordingCard = ({
  recording,
  defaultExpanded,
}: RecordingCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recording/${recording.id}`);
  };

  const getHeadline = (analysis: string | null): string => {
    if (!analysis) return "";
    
    try {
      // First try to parse as JSON
      const cleanAnalysis = analysis.replace(/```json\n|\n```/g, '');
      const parsedAnalysis = JSON.parse(cleanAnalysis);
      
      const headlineSection = parsedAnalysis.sections?.find(
        (section: any) => section.type === 'headline'
      );
      
      if (headlineSection && typeof headlineSection.content === 'string') {
        return headlineSection.content;
      }
      
      // If no headline section found but it's valid JSON, return empty string
      return "";
    } catch (error) {
      // If JSON parsing fails, try to extract first meaningful line
      const lines = analysis.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        // Remove markdown headers and clean the line
        return lines[0].replace(/^#+\s*/, '').trim();
      }
      return "";
    }
  };

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "mb-1 transition-all duration-300 hover:shadow-lg cursor-pointer relative",
        "rounded-2xl border border-border/50 backdrop-blur-sm active:scale-[0.99]",
        "bg-white/80 p-5 px-6"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium">
              {format(new Date(recording.created_at), "MMM d, yyyy")}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(recording.created_at), "h:mm a")}
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F1F1F1] text-zinc-600 shadow-sm hover:bg-[#E8E8E8] transition-colors">
            {recording.session_type.charAt(0).toUpperCase() + recording.session_type.slice(1)}
          </span>
        </div>
        {recording.analysis && (
          <div className="text-sm text-muted-foreground line-clamp-1 mt-3">
            {getHeadline(recording.analysis)}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecordingCard;