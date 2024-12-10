import { useEffect, useState } from "react";
import RecordingHistory from "@/components/RecordingHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import AdminPromptPanel from "@/components/AdminPromptPanel";

const History = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }
      
      setIsAdmin(data?.is_admin || false);
    };

    checkAdminStatus();
  }, [session?.user?.id]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recorder
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Recording History</h1>
        </div>

        {isAdmin && (
          <div className="mb-8">
            <AdminPromptPanel />
          </div>
        )}
        
        <RecordingHistory />
      </div>
    </div>
  );
};

export default History;