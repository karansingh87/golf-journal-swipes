import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./integrations/supabase/client";
import VoiceRecorderContainer from "./components/VoiceRecorderContainer";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Notes from "./pages/Notes";
import Trends from "./pages/Trends";
import Admin from "./pages/Admin";
import RecordingDetail from "./pages/RecordingDetail";

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
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/record" element={<VoiceRecorderContainer />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/recording/:id" element={<RecordingDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/history" element={<Navigate to="/notes" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;