import { cn } from "@/lib/utils";

export type FilterType = "all" | "course" | "practice";

interface FilterPillsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterPills = ({ selectedFilter, onFilterChange }: FilterPillsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {(["all", "course", "practice"] as FilterType[]).map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            "whitespace-nowrap min-w-[80px] backdrop-blur-sm",
            selectedFilter === filter
              ? "bg-golf-green text-white shadow-sm"
              : "bg-background/50 text-muted-foreground hover:bg-background/80"
          )}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;