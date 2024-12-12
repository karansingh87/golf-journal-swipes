import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import SearchBar from "@/components/history/SearchBar";
import FilterPills, { FilterType } from "@/components/history/FilterPills";
import RecordingHistory from "@/components/RecordingHistory";

const History = () => {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">Recording History</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterPills selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </div>
        <RecordingHistory searchQuery={searchQuery} filter={selectedFilter} />
      </div>
    </div>
  );
};

export default History;