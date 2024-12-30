import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative pt-2 pb-2 px-4 sm:px-6 md:px-8">
      <Search className="absolute left-7 sm:left-9 md:left-11 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-400 z-10" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className={cn(
          "pl-9 bg-background/50 backdrop-blur-sm border-zinc-300/70 rounded-full h-10",
          "transition-all duration-200 focus-visible:ring-offset-0 focus-visible:ring-golf-green/20",
          "placeholder:text-muted-foreground/60",
          "hover:border-zinc-400/70"
        )}
      />
    </div>
  );
};

export default SearchBar;