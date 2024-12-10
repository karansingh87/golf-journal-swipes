import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const session = useSession();

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="max-w-2xl mx-auto mb-6 flex justify-end gap-2">
      <button
        onClick={() => navigate('/history')}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        View History
      </button>
      {profile?.is_admin && (
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Admin Panel
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;