import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        {/* Animated border circles */}
        <div className="absolute inset-0 -m-2 rounded-full border-4 border-golf-green opacity-40 animate-border-pulse" />
        <div className="absolute inset-0 -m-3 rounded-full border-4 border-golf-green opacity-30 animate-rotate" />
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-golf-green/30 rounded-full blur-xl" />
        
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge
          isActive={true}
          variant="dark"
          className="hover:scale-105 active:scale-95 transition-transform duration-200 relative z-10"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;