import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ThemeHeaderProps {
  onCreateTheme: () => void;
}

const ThemeHeader = ({ onCreateTheme }: ThemeHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Color Themes</h2>
      <Button onClick={onCreateTheme} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        New Theme
      </Button>
    </div>
  );
};

export default ThemeHeader;