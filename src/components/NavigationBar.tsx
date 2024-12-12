import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings } from "lucide-react";
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
    <div className="absolute top-4 right-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-golf-green hover:text-golf-muted hover:bg-golf-subtle transition-colors duration-200"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="w-48 bg-white rounded-md shadow-md animate-in fade-in-80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          {profile?.is_admin && (
            <>
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-golf-gray-text-primary hover:bg-golf-subtle"
                onClick={() => navigate('/admin')}
              >
                <Settings className="h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-golf-gray-light" />
            </>
          )}
          <DropdownMenuItem 
            className="cursor-pointer flex items-center gap-2 text-golf-gray-text-primary hover:bg-golf-subtle"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavigationBar;