import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthCard from "@/components/auth/AuthCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/record');
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/record');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContainer>
      <div className="space-y-6">
        <AuthCard>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#333333',
                  }
                }
              }
            }}
            theme="light"
            providers={[]}
            view="sign_in"
            showLinks={false}
          />
        </AuthCard>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-zinc-600">Don't have an account?</p>
          <Button
            onClick={() => navigate('/signup')}
            variant="outline"
            className="w-full"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;