import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-14 backdrop-blur-sm border-b border-zinc-800/10 bg-white/80">
      <div className="h-full px-6 flex justify-between items-center">
        <div className="text-2xl font-logo tracking-[-0.03em] cursor-pointer hover:opacity-90 transition-opacity flex items-center">
          <span 
            className="flex items-center text-zinc-900"
            style={{
              WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.08)',
            }}
          >
            golflog
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="font-medium"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;