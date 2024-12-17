import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        {/* Animated border */}
        <div className="absolute -inset-1">
          <div className="w-full h-full rounded-full animate-spin-slow bg-gradient-to-r from-purple-600/50 to-purple-400/50 blur-sm" />
        </div>
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-zinc-950/20 rounded-full blur-xl" />
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge
          isActive={true}
          variant="dark"
          className="relative hover:scale-105 active:scale-95 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;