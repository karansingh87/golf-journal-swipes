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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 right-0 z-50 w-[95%] max-w-3xl">
      <div className="bg-zinc-900/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-zinc-800/50">
        <div className="flex justify-between items-center">
          <div 
            onClick={() => navigate('/record')}
            className="text-xl font-bold tracking-tighter cursor-pointer text-white/90 hover:text-white transition-colors flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#ACE580] flex items-center justify-center shadow-[0_0_15px_rgba(172,229,128,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            golflog
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 p-2.5 group"
              >
                <Menu className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="w-48 bg-zinc-900 text-white border-zinc-800 rounded-lg shadow-xl"
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
    </div>
  );
};

export default NavigationBar;