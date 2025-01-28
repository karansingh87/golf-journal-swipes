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
        navigate('/playbook');
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/playbook');
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
            showLinks={true}
            localization={{
              variables: {
                sign_up: {
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Sign up",
                  loading_button_label: "Signing up ...",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: "Don't have an account? Sign up",
                  confirmation_text: "Check your email for the confirmation link and check your spam folder if you don't see it within a few minutes",
                },
                sign_in: {
                  email_label: "Email",
                  password_label: "Password",
                  button_label: "Sign in",
                  loading_button_label: "Signing in ...",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: "Already have an account? Sign in",
                },
                magic_link: {
                  email_input_label: "Email address",
                  button_label: "Send Magic Link",
                  loading_button_label: "Sending Magic Link ...",
                  link_text: "Send a magic link email",
                  confirmation_text: "Check your email for the magic link and don't forget to check your spam folder!",
                },
                forgotten_password: {
                  email_label: "Email address",
                  button_label: "Send reset password instructions",
                  loading_button_label: "Sending reset instructions ...",
                  link_text: "Forgot your password?",
                  confirmation_text: "Check your email for the password reset link. Remember to check your spam folder if you don't see it!",
                },
              },
            }}
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