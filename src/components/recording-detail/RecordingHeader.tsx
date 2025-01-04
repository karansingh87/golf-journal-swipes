import { format } from "date-fns";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div>
        <h1 className="text-2xl font-semibold text-golf-gray-text-primary mb-2">
          {getHeadline()}
        </h1>
        <p className="text-sm text-golf-gray-text-secondary">
          {format(new Date(recording.created_at), "MMMM d, yyyy")} • {format(new Date(recording.created_at), "h:mm a")}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RecordingHeader;