import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Menu, Settings } from "lucide-react";
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
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data;
    },
  });

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      const { error } = await supabaseClient.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-14 backdrop-blur-sm border-b border-zinc-800/10 bg-white/80">
      <div className="h-full px-6 flex justify-between items-center">
        <div 
          onClick={() => navigate(isAuthPage ? '/' : '/record')}
          className="text-2xl font-logo tracking-[-0.03em] cursor-pointer hover:opacity-90 transition-opacity flex items-center"
        >
          <span 
            className="flex items-center text-zinc-900"
            style={{
              WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.08)',
            }}
          >
            golflog
          </span>
        </div>
        
        <div className="flex-1 flex justify-end">
          {!isAuthPage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-10 w-10 flex items-center justify-center hover:bg-zinc-50/50 rounded-full transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5 text-zinc-900" strokeWidth={1.5} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="w-48 bg-white/95 backdrop-blur-sm border-zinc-200 rounded-lg mt-2 shadow-sm"
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
                <DropdownMenuSeparator className="bg-zinc-200" />
                <DropdownMenuItem 
                  className="cursor-pointer text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 focus:bg-zinc-50"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
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
    </div>
  );
};

export default NavigationBar;