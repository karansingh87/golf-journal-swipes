import { format } from "date-fns";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
}

const RecordingHeader = ({ recording, onDelete }: RecordingHeaderProps) => {
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
    <div className="flex justify-between items-start mb-6">
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
          <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
            {getHeadline()}
          </h1>
          <p className="text-sm text-golf-gray-text-secondary">
            {format(new Date(recording.created_at), "MMMM d, yyyy")} • {format(new Date(recording.created_at), "h:mm a")}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default RecordingHeader;