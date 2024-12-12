import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className={cn(
          "pl-9 bg-background/50 backdrop-blur-sm border-muted rounded-full h-12",
          "transition-all duration-200 focus-visible:ring-offset-0 focus-visible:ring-golf-green/20",
          "placeholder:text-muted-foreground/60"
        )}
      />
    </div>
  );
};

export default SearchBar;