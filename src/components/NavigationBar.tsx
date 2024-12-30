import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationBar = () => {
  const supabaseClient = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      return data;
    },
  });

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-zinc-900 h-14">
      <div className="h-full px-4 flex justify-between items-center">
        <div 
          onClick={() => navigate('/record')}
          className="text-xl font-bold tracking-[-0.03em] cursor-pointer hover:text-white transition-colors flex items-center"
        >
          <span className="text-[#ACE580]">golf<span className="text-white/90">log</span></span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 p-2 group"
            >
              <Menu className="w-[18px] h-[18px] text-white/70 group-hover:text-white transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end"
            className="w-48 bg-zinc-900 text-white border-zinc-800 mt-1"
          >
            <DropdownMenuItem 
              className="cursor-pointer text-white/70 hover:text-white hover:bg-zinc-800 focus:bg-zinc-800"
              onClick={() => navigate('/record')}
            >
              Record
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer text-white/70 hover:text-white hover:bg-zinc-800 focus:bg-zinc-800"
              onClick={() => navigate('/notes')}
            >
              Notes
            </DropdownMenuItem>
            {profile?.is_admin && (
              <>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  className="cursor-pointer text-white/70 hover:text-white hover:bg-zinc-800 focus:bg-zinc-800"
                  onClick={() => navigate('/admin')}
                >
                  Admin Panel
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem 
              className="cursor-pointer text-white/70 hover:text-white hover:bg-zinc-800 focus:bg-zinc-800"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavigationBar;