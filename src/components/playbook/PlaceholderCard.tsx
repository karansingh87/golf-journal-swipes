import { Plus } from "lucide-react";

const PlaceholderCard = () => {
  return (
    <button
      className="w-full py-8 px-6 bg-gradient-to-br from-emerald-50/80 to-teal-100/80
        backdrop-blur-sm hover:from-emerald-100 hover:to-teal-200 rounded-2xl 
        shadow-sm transition-all duration-200
        flex items-start gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="w-10 h-10 flex items-center justify-center pt-1">
        <Plus className="w-5 h-5 text-zinc-950" />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-base leading-none mb-2">Coming Soon</h3>
        <p className="text-sm text-muted-foreground/80 leading-tight">
          New feature coming soon
        </p>
      </div>
    </button>
  );
};

export default PlaceholderCard;