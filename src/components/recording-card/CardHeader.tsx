import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface CardHeaderProps {
  createdAt: string;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const CardHeader = ({ createdAt, onEdit, onDelete }: CardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-base font-semibold text-foreground">
          {format(new Date(createdAt), "MMM d, yyyy")}
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(createdAt), "h:mm a")}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-9 w-9 hover:bg-golf-gray-light"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-9 w-9 hover:bg-golf-gray-light"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default CardHeader;