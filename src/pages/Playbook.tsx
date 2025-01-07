import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import CoachingNotesButton from "@/components/trends/CoachingNotesButton";

const Playbook = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Playbook</h1>
          <CoachingNotesButton />
        </div>
        <div className="grid gap-6">
          {/* Content will be added here as needed */}
        </div>
      </div>
    </div>
  );
};

export default Playbook;