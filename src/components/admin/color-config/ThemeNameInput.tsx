import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ColorConfig } from "../types";

interface ThemeNameInputProps {
  config: ColorConfig;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onActivate: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

const ThemeNameInput = ({
  config,
  isLoading,
  onNameChange,
  onActivate,
  onDelete,
  canDelete,
}: ThemeNameInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Label htmlFor="themeName">Theme Name</Label>
        <Input
          id="themeName"
          value={config.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="flex items-end gap-2">
        <Button
          variant="outline"
          onClick={onActivate}
          disabled={config.is_active || isLoading}
        >
          Activate Theme
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          disabled={!canDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ThemeNameInput;