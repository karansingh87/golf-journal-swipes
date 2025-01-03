import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthCard from "@/components/auth/AuthCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/record');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContainer>
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
        />
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;