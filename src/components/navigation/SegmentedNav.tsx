import { cn } from "@/lib/utils";
import { Notebook, TrendingUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SegmentItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  path: string;
}

const segments: SegmentItem[] = [
  {
    label: "Notes",
    value: "notes",
    icon: <Notebook className="h-4 w-4" />,
    path: "/notes"
  },
  {
    label: "Trends",
    value: "trends",
    icon: <TrendingUp className="h-4 w-4" />,
    path: "/trends"
  }
];

const SegmentedNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [hasNewRecordings, setHasNewRecordings] = useState(false);

  useEffect(() => {
    const checkNewRecordings = async () => {
      try {
        // Get the latest trends entry to find the last update time
        const { data: trendsData } = await supabase
          .from('trends')
          .select('last_analysis_at')
          .order('last_analysis_at', { ascending: false })
          .limit(1)
          .single();

        if (trendsData?.last_analysis_at) {
          const lastUpdateTime = new Date(trendsData.last_analysis_at);

          // Count new recordings since last trends update
          const { count } = await supabase
            .from('recordings')
            .select('*', { count: 'exact', head: true })
            .gt('created_at', lastUpdateTime.toISOString());

          setHasNewRecordings((count || 0) >= 3);
        }
      } catch (error) {
        console.error('Error checking new recordings:', error);
        setHasNewRecordings(false);
      }
    };

    checkNewRecordings();
    
    // Set up real-time subscription for new recordings
    const channel = supabase
      .channel('recordings-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'recordings' },
        () => {
          checkNewRecordings();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 w-full max-w-xs mx-auto">
      <style>
        {`
          .segment-button {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-appearance: none;
            appearance: none;
            transform: translateZ(0);
            user-select: none;
          }
        `}
      </style>
      {segments.map((segment, index) => (
        <button
          key={segment.value}
          onClick={() => navigate(segment.path)}
          className={cn(
            "segment-button",
            "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-colors duration-150",
            "flex-1 justify-center relative",
            "outline-none focus:outline-none focus-visible:outline-none active:outline-none",
            "select-none touch-none",
            currentPath === segment.path
              ? "bg-zinc-950 text-white"
              : "text-zinc-600 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent",
            index === 0 ? "border-r border-zinc-200" : ""
          )}
        >
          <div className="relative">
            {segment.icon}
            {segment.value === 'trends' && hasNewRecordings && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
          {segment.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedNav;