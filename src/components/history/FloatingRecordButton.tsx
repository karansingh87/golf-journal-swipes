import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-8 z-50">
      <div className="relative">
        {/* Enhanced blur/glow effect */}
        <div className="absolute inset-0 bg-zinc-950/20 rounded-full blur-xl transform scale-110" />
        {/* Stronger shadow underneath */}
        <div className="absolute inset-0 rounded-full shadow-2xl bg-zinc-950/5" />
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-zinc-950/10 animate-pulse-ring" />
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge={false}
          isActive={true}
          variant="dark"
          className="hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xl hover:shadow-2xl"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;