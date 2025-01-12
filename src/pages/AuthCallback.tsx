import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session?.user) {
          // Create Stripe checkout session
          const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
            'create-checkout-session',
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            }
          );

          if (checkoutError) throw checkoutError;

          // Redirect to Stripe checkout
          if (checkoutData?.url) {
            window.location.href = checkoutData.url;
            return;
          }
        }
        
        // If something goes wrong, redirect to the onboarding page anyway
        navigate(redirectTo);
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem setting up your trial. Please contact support.",
        });
        navigate(redirectTo);
      }
    };

    handleCallback();
  }, [navigate, redirectTo, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Setting up your account...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default AuthCallback;