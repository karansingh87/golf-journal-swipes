import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        
        // Check if it's a network error and we should retry
        if (signInError.message.includes('fetch') && retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          await delay(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
          return signIn(email, password); // Retry the submission
        }

        let errorMessage = "An error occurred during login. Please try again.";
        
        if (signInError.message.includes('Invalid login')) {
          errorMessage = "Incorrect email or password. Please try again.";
        } else if (signInError.message.includes('network') || signInError.message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
        
        toast({
          variant: "destructive",
          title: "Login failed",
          description: errorMessage,
        });
        return false;
      }

      setRetryCount(0); // Reset retry count on successful login
      return true;
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
  };
};