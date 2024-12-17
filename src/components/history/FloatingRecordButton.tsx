import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        {/* Animated border circles */}
        <div className="absolute inset-0 -m-6 rounded-full border-[3px] border-golf-green opacity-80 animate-border-pulse" />
        <div className="absolute inset-0 -m-8 rounded-full border-[3px] border-golf-green opacity-70 animate-rotate" />
        
        {/* Background glow */}
        <div className="absolute inset-0 -m-2 bg-golf-green/20 rounded-full blur-lg" />
        
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge
          isActive={true}
          variant="dark"
          className="relative z-10 shadow-neon-glow hover:scale-105 active:scale-95 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;