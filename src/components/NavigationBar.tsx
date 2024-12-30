import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
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

  const isLandingPage = location.pathname === '/';

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-14 bg-transparent border-b border-zinc-800/10">
      <div className="h-full px-6 flex justify-between items-center">
        <div 
          onClick={() => navigate(isLandingPage ? '/login' : '/record')}
          className="text-xl font-bold tracking-[-0.03em] cursor-pointer hover:text-white transition-colors flex items-center"
        >
          <span className="text-[#ACE580]">golf<span className="text-zinc-800/90">log</span></span>
        </div>
        
        {!isLandingPage && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 hover:bg-zinc-100/10 rounded-md transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-zinc-800/90" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="w-48 bg-white/95 backdrop-blur-sm border-zinc-200 rounded-lg mt-1 shadow-sm"
            >
              <DropdownMenuItem 
                className="cursor-pointer text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 focus:bg-zinc-50"
                onClick={() => navigate('/record')}
              >
                Record
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 focus:bg-zinc-50"
                onClick={() => navigate('/notes')}
              >
                Notes
              </DropdownMenuItem>
              {profile?.is_admin && (
                <>
                  <DropdownMenuSeparator className="bg-zinc-200" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 focus:bg-zinc-50"
                    onClick={() => navigate('/admin')}
                  >
                    Admin Panel
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator className="bg-zinc-200" />
              <DropdownMenuItem 
                className="cursor-pointer text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 focus:bg-zinc-50"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;