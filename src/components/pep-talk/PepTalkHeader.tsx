import { format } from "date-fns";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PepTalkHeaderProps {
  createdAt: string;
  recordingCount: number;
  onDelete: () => void;
}

const PepTalkHeader = ({ createdAt, recordingCount, onDelete }: PepTalkHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => navigate('/pep_talks')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Your Pep Talk
          </h1>
          <p className="text-sm text-muted-foreground">
            {format(new Date(createdAt), "MMMM d, yyyy")} • {format(new Date(createdAt), "h:mm a")} • Based on {recordingCount} recording{recordingCount !== 1 ? 's' : ''}
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

export default PepTalkHeader;