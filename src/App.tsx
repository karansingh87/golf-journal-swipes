import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./integrations/supabase/client";
import { SubscriptionGuard } from "./components/subscription/SubscriptionGuard";
import VoiceRecorderContainer from "./components/VoiceRecorderContainer";
import NavigationBar from "./components/NavigationBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Trends from "./pages/Trends";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import RecordingDetail from "./pages/RecordingDetail";
import SharedRecording from "./pages/SharedRecording";
import SharedCoachNote from "./pages/SharedCoachNote";
import Playbook from "./pages/Playbook";
import CoachNotes from "./pages/CoachNotes";
import CoachNoteDetail from "./pages/CoachNoteDetail";
import PepTalkDetail from "./pages/PepTalkDetail";
import PepTalks from "./pages/PepTalks";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <BrowserRouter>
          <NavigationBar />
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shared/:id" element={<SharedRecording />} />
            <Route path="/shared/coach_notes/:id" element={<SharedCoachNote />} />
            <Route path="/record" element={<VoiceRecorderContainer />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/recording/:id" element={<RecordingDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Previously protected routes - now using feature-level gates */}
            <Route path="/trends" element={<Trends />} />
            <Route path="/coach_notes" element={<CoachNotes />} />
            <Route path="/coach_notes/:id" element={<CoachNoteDetail />} />
            <Route path="/pep_talks" element={<PepTalks />} />
            <Route path="/pep_talk/:id" element={<PepTalkDetail />} />
            
            {/* Admin route - keeps SubscriptionGuard for security */}
            <Route path="/admin" element={<SubscriptionGuard><Admin /></SubscriptionGuard>} />
            
            {/* Redirects */}
            <Route path="/history" element={<Navigate to="/notes" replace />} />
            <Route path="/support" element={<Navigate to="/faq" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;