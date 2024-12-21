import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/history/SearchBar";
import FilterPills, { FilterType } from "@/components/history/FilterPills";
import RecordingHistory from "@/components/RecordingHistory";
import FloatingRecordButton from "@/components/history/FloatingRecordButton";
import { Button } from "@/components/ui/button";

const Notes = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-4">
        <div className="space-y-4 px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Notes</h1>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterPills selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </div>
        <RecordingHistory searchQuery={searchQuery} filter={selectedFilter} />
      </div>
      <FloatingRecordButton />
    </div>
  );
};

export default Notes;