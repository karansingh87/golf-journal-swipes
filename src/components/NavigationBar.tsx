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
import { Button } from "./ui/button";

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
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold tracking-tighter">
            GolfLog
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="w-48 bg-white rounded-md shadow-md animate-in fade-in-80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            >
              {profile?.is_admin && (
                <>
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => navigate('/admin')}
                  >
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                </>
              )}
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-gray-700 hover:bg-gray-50"
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