import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-golf-green/20 rounded-full blur-xl" />
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge
          className="hover:scale-105 active:scale-95 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;