import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import SearchBar from "@/components/history/SearchBar";
import RecordingHistory from "@/components/RecordingHistory";
import FloatingRecordButton from "@/components/history/FloatingRecordButton";
import SegmentedNav from "@/components/navigation/SegmentedNav";

const Notes = () => {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-16">
        <div className="fixed top-16 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <SegmentedNav />
          </div>
        </div>
        
        <div className="px-4 sm:px-6 lg:px-8 pt-16">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="mt-2">
            <RecordingHistory searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <FloatingRecordButton />
    </div>
  );
};

export default Notes;