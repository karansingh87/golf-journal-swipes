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
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Notes</h1>
          </div>
          <SegmentedNav />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <RecordingHistory searchQuery={searchQuery} filter="all" />
      </div>
      <FloatingRecordButton />
    </div>
  );
};

export default Notes;