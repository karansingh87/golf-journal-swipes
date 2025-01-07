import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Playbook from "./pages/Playbook";
import CoachNotes from "./pages/CoachNotes";
import CoachNoteDetail from "./pages/CoachNoteDetail";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SessionContextProvider supabaseClient={supabase} initialSession={session}>
          <Toaster />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/coach_notes" element={<CoachNotes />} />
            <Route path="/coach_notes/:id" element={<CoachNoteDetail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </SessionContextProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;