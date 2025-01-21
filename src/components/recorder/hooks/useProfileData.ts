import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export const useProfileData = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  
  console.log("useProfileData: Current session", session);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      console.log("useProfileData: Fetching profile for user", session?.user?.id);
      if (!session?.user?.id) {
        console.log("useProfileData: No user ID available");
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error("useProfileData: Error fetching profile:", error);
        throw error;
      }

      console.log("useProfileData: Profile data received:", data);
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return {
    profile,
    isProfileLoading,
    isAuthenticated: !!session?.user?.id,
  };
};