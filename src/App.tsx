import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Playbook from "./pages/Playbook";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Trends from "./pages/Trends";
import PepTalks from "./pages/PepTalks";
import PepTalkDetail from "./pages/PepTalkDetail";
import CoachNotes from "./pages/CoachNotes";
import CoachNoteDetail from "./pages/CoachNoteDetail";
import SharedCoachNote from "./pages/SharedCoachNote";
import SharedRecording from "./pages/SharedRecording";
import RecordingDetail from "./pages/RecordingDetail";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/playbook" element={<Playbook />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/pep_talks" element={<PepTalks />} />
              <Route path="/pep_talk/:id" element={<PepTalkDetail />} />
              <Route path="/coach_notes" element={<CoachNotes />} />
              <Route path="/coach_notes/:id" element={<CoachNoteDetail />} />
              <Route path="/shared/coach_notes/:id" element={<SharedCoachNote />} />
              <Route path="/shared/recording/:id" element={<SharedRecording />} />
              <Route path="/recording/:id" element={<RecordingDetail />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;