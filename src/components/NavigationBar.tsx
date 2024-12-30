import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 right-0 z-50 w-[95%] max-w-3xl">
      <div className="bg-zinc-900/90 backdrop-blur-md rounded-full px-3 py-2 shadow-[0_0_30px_-5px_rgba(172,229,128,0.2)] border border-zinc-800/30">
        <div className="flex justify-between items-center">
          <div 
            onClick={() => navigate('/record')}
            className="text-xl font-bold tracking-tighter cursor-pointer text-white/90 hover:text-white transition-colors flex items-center"
          >
            <span><span className="text-[#ACE580]">golf</span>log</span>
          </div>
          
          <button
            className="rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 p-2 group"
          >
            <Menu className="w-[18px] h-[18px] text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;