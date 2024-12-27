import { cn } from "@/lib/utils";
import { Notebook, TrendingUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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

  return (
    <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200">
      {segments.map((segment, index) => (
        <button
          key={segment.value}
          onClick={() => navigate(segment.path)}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
            "flex-1 justify-center relative",
            "hover:bg-zinc-900/5",
            currentPath === segment.path
              ? "bg-zinc-950 text-white"
              : "text-zinc-600 bg-transparent",
            // Add subtle border between segments
            index === 0 ? "border-r border-zinc-200" : ""
          )}
        >
          {segment.icon}
          {segment.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedNav;