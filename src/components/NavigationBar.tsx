import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "./ui/use-toast";

const NavigationBar = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-golf-green hover:text-golf-muted hover:bg-golf-subtle"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default NavigationBar;