import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./integrations/supabase/client";
import SubscriptionGuard from "./components/subscription/SubscriptionGuard";
import ReactGA from "react-ga4";
import { useEffect } from "react";
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
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RecordingContainer from "./components/recorder/RecordingContainer";

// Initialize GA4
ReactGA.initialize("G-3VEFQ2RGDH");

// Custom ScrollToTop component with page view tracking
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Send pageview to GA4
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return null;
};

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
          <ScrollToTop />
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
            <Route path="/record" element={<RecordingContainer />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/recording/:id" element={<RecordingDetail />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/coach_notes" element={<CoachNotes />} />
            <Route path="/coach_notes/:id" element={<CoachNoteDetail />} />
            <Route path="/pep_talks" element={<PepTalks />} />
            <Route path="/pep_talk/:id" element={<PepTalkDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
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
