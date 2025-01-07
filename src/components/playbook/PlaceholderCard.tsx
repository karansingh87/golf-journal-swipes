import { Plus } from "lucide-react";

const PlaceholderCard = () => {
  return (
    <button
      className="w-full py-9 px-3 bg-gradient-to-br from-amber-50 to-orange-100
        backdrop-blur-sm hover:from-amber-100 hover:to-orange-200 rounded-2xl 
        border border-white/20 shadow-sm transition-all duration-200
        flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/80 rounded-full group-hover:bg-white/90 
          transition-colors duration-200" />
        <Plus className="w-3.5 h-3.5 text-zinc-950 relative z-10" />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-sm leading-none mb-0.5">Coming Soon</h3>
        <p className="text-[10px] text-muted-foreground leading-tight">
          New feature coming soon
        </p>
      </div>
    </button>
  );
};

export default PlaceholderCard;