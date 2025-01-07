import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./integrations/supabase/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Toaster } from "./components/ui/toaster";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Playbook from "./pages/Playbook";
import CoachNotes from "./pages/CoachNotes";
import CoachNoteDetail from "./pages/CoachNoteDetail";
import PrivateRoute from "./components/PrivateRoute";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <SessionContextProvider supabaseClient={supabase} initialSession={session}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
          <Route
            path="/playbook"
            element={
              <PrivateRoute>
                <Playbook />
              </PrivateRoute>
            }
          />
          <Route
            path="/coach_notes"
            element={
              <PrivateRoute>
                <CoachNotes />
              </PrivateRoute>
            }
          />
          <Route
            path="/coach_notes/:id"
            element={
              <PrivateRoute>
                <CoachNoteDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </SessionContextProvider>
    </Router>
  );
}

export default App;