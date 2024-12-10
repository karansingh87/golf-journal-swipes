import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import VoiceRecorder from "../components/VoiceRecorder";

const Index = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 flex justify-end">
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
      <VoiceRecorder />
    </div>
  );
};

export default Index;