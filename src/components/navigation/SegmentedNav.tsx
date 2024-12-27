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
    <div className="flex p-1 bg-zinc-100/80 backdrop-blur-sm rounded-lg shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)]">
      {segments.map((segment) => (
        <button
          key={segment.value}
          onClick={() => navigate(segment.path)}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
            "flex-1 justify-center relative",
            "hover:bg-zinc-950 hover:text-white",
            currentPath === segment.path
              ? "bg-zinc-950 text-white shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2)]"
              : "text-zinc-600 hover:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2)]"
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