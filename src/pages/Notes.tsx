import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import SearchBar from "@/components/history/SearchBar";
import RecordingHistory from "@/components/RecordingHistory";
import FloatingRecordButton from "@/components/history/FloatingRecordButton";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";

const Notes = () => {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-14">
        <PageBreadcrumb currentPage="Notes" />
        <div className="px-2 sm:px-6 lg:px-8 pt-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="mt-3">
            <RecordingHistory searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <FloatingRecordButton />
    </div>
  );
};

export default Notes;