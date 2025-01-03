import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Using a test admin account
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "admin@golflog.com",
          password: "admin123",
        });

        if (error) throw error;

        if (data?.user) {
          toast({
            title: "Auto-login successful",
            description: "Logged in as admin",
          });
          navigate('/record');
        }
      } catch (error: any) {
        console.error('Auto-login error:', error);
        toast({
          variant: "destructive",
          title: "Auto-login failed",
          description: error.message,
        });
      }
    };

    autoLogin();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Auto-logging in as admin...</h1>
        <p className="text-gray-500">Please wait</p>
      </div>
    </div>
  );
};

export default Login;