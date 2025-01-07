import { Plus } from "lucide-react";

const PlaceholderCard = () => {
  return (
    <button
      className="w-full p-6 bg-card hover:bg-accent rounded-lg border transition-colors 
        flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-zinc-100 rounded-full group-hover:bg-zinc-50 
          transition-colors duration-200" />
        <Plus className="w-5 h-5 text-zinc-950 relative z-10" />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-lg">Coming Soon</h3>
        <p className="text-sm text-muted-foreground">
          New feature coming soon
        </p>
      </div>
    </button>
  );
};

export default PlaceholderCard;