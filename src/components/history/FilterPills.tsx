import { cn } from "@/lib/utils";

export type FilterType = "all" | "course" | "practice";

interface FilterPillsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterPills = ({ selectedFilter, onFilterChange }: FilterPillsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none">
      {(["all", "course", "practice"] as FilterType[]).map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "whitespace-nowrap min-w-[80px]",
            selectedFilter === filter
              ? "bg-zinc-950 text-white shadow-sm"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
          )}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;