import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import SearchBar from "@/components/history/SearchBar";
import CoachNotesHistory from "@/components/coach-notes/CoachNotesHistory";
import SegmentedNav from "@/components/navigation/SegmentedNav";

const CoachNotes = () => {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-14">
        <div className="fixed top-16 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SegmentedNav />
          </div>
        </div>
        
        <div className="px-4 sm:px-6 lg:px-8 pt-20">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="mt-3">
            <CoachNotesHistory searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachNotes;