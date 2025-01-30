import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthCard from "@/components/auth/AuthCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Profile query that only runs when we have a userId
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      return data;
    },
    enabled: !!userId,
    retry: 2,
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session?.user?.id) {
        setUserId(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Effect to handle navigation once profile is loaded
  useEffect(() => {
    if (userId && profile && !isProfileLoading) {
      console.log("Profile loaded, navigating to playbook:", profile);
      navigate('/playbook');
    }
  }, [userId, profile, isProfileLoading, navigate]);

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