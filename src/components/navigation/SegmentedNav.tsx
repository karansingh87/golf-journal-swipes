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
          {segment.icon}
          {segment.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedNav;