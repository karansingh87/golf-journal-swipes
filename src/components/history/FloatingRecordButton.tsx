import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Blur/glow effect */}
        <div className="absolute inset-0 bg-zinc-950/20 rounded-full blur-xl" />
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-zinc-950/10 animate-pulse-ring" />
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge={false}
          isActive={true}
          variant="dark"
          className="hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;