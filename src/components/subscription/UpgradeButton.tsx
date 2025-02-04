import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export interface UpgradeButtonProps {
  className?: string;
  priceId: string;
}

export const UpgradeButton = ({ className, priceId }: UpgradeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      
      // If no session, redirect to login
      if (!session) {
        navigate('/signup');
        return;
      }

      console.log('Creating checkout session with price:', priceId);
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Checkout session response:', { data, error });

      if (error) throw error;

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to checkout...
        </>
      ) : (
        'Subscribe'
      )}
    </Button>
  );
};