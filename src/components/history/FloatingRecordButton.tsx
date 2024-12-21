import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ControlButton from "../recorder/ControlButton";

const FloatingRecordButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        <div className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#ACE580"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="289.02652413026095"
              strokeDashoffset="216.76989309769572"
              style={{
                filter: 'drop-shadow(0 0 2px #ACE580)',
              }}
            />
          </svg>
        </div>
        <div className="absolute inset-0 bg-zinc-950/20 rounded-full blur-xl" />
        <ControlButton
          icon={Mic}
          onClick={() => navigate('/record')}
          isLarge
          isActive={true}
          variant="dark"
          className="hover:scale-105 active:scale-95 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default FloatingRecordButton;