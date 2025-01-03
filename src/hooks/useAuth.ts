import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

export const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setRetryCount(0);
      
      const attemptSignIn = async (attempt: number): Promise<boolean> => {
        try {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            // Handle specific auth errors
            if (signInError.message.includes('Invalid login')) {
              toast({
                variant: "destructive",
                title: "Login failed",
                description: "Invalid email or password. Please try again.",
              });
              return false;
            }
            
            // For network errors, attempt retry
            if (signInError.message.includes('fetch') && attempt < MAX_RETRIES) {
              const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
              await delay(retryDelay);
              return attemptSignIn(attempt + 1);
            }

            // Handle other errors
            toast({
              variant: "destructive",
              title: "Login failed",
              description: signInError.message || "An unexpected error occurred.",
            });
            return false;
          }

          return true;
        } catch (error) {
          console.error('Sign in attempt failed:', error);
          if (attempt < MAX_RETRIES) {
            const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
            await delay(retryDelay);
            return attemptSignIn(attempt + 1);
          }
          throw error;
        }
      };

      const success = await attemptSignIn(0);
      return success;

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Unable to connect to the server. Please check your connection and try again.",
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