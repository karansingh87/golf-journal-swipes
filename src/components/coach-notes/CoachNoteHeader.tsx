import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface CoachNoteHeaderProps {
  createdAt: string;
  isPublic: boolean;
  onDelete: () => void;
  onTogglePublic: () => void;
  onShare: () => void;
}

const CoachNoteHeader = ({
  createdAt,
  isPublic,
  onDelete,
  onTogglePublic,
  onShare,
}: CoachNoteHeaderProps) => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => navigate('/coach_notes')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Coaching Notes
            </h1>
            <p className="text-sm text-muted-foreground">
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pl-11">
        <div className="flex items-center gap-2">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={onTogglePublic}
          />
          <label
            htmlFor="public"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {isPublic ? 'Public' : 'Private'}
          </label>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className={`h-6 px-2 text-xs gap-1 ${
              isCopied ? 'text-green-600' : ''
            }`}
          >
            <Share2 className="h-3 w-3" />
            {isCopied ? 'Copied!' : 'Share'}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CoachNoteHeader;