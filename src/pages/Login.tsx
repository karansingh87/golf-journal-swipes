import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    // Only redirect if we have a valid session
    if (session?.user) {
      navigate("/record");
    }

    // Check for any error parameters in the URL (from OAuth redirects)
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error_description');
    if (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error,
      });
    }
  }, [navigate, toast, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#333333',
                  },
                },
              },
              className: {
                button: 'w-full px-4 py-2 text-white bg-black hover:bg-gray-800',
                input: 'w-full px-3 py-2 border rounded-md',
                label: 'text-sm font-medium text-gray-700',
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/record`}
          />
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm text-blue-800">
            For testing, you can create a new account with any email. The verification email step has been disabled.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Login;