import { MessageCircle } from "lucide-react";

const PepTalkCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white rounded-xl border border-border/40 shadow-card-light 
        hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full" />
          <MessageCircle className="w-5 h-5 text-primary relative z-10" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-base font-medium text-foreground">
            Get a Pep Talk
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate personalized motivation from your recordings
          </p>
        </div>
      </div>
    </button>
  );
};

export default PepTalkCard;