import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthTestingAlert from "@/components/auth/AuthTestingAlert";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    const checkSessionAndOnboarding = async () => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('onboarding_completed, onboarding_skipped')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

          if (!profile.onboarding_completed && !profile.onboarding_skipped) {
            navigate("/onboarding");
          } else {
            navigate("/record");
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to check profile status. Please try again.",
          });
        }
      }
    };

    checkSessionAndOnboarding();

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

  const redirectUrl = window.location.origin.replace(/\/$/, '') + '/record';

  return (
    <AuthContainer>
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Please sign in to continue" 
      />

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
          redirectTo={redirectUrl}
        />
      </div>

      <AuthTestingAlert />
    </AuthContainer>
  );
};

export default Login;