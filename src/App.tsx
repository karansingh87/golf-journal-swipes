import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSession } from "@supabase/auth-helpers-react";
import { supabase } from "./integrations/supabase/client";
import VoiceRecorderContainer from "./components/VoiceRecorderContainer";
import NavigationBar from "./components/NavigationBar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Admin from "./pages/Admin";
import RecordingDetail from "./pages/RecordingDetail";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check session validity
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        // Clear any stale session data
        await supabase.auth.signOut();
        navigate('/login', { replace: true });
      }
    };
    
    checkSession();
  }, [navigate]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase} initialSession={null}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/record" element={
              <ProtectedRoute>
                <VoiceRecorderContainer />
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/recording/:id" element={
              <ProtectedRoute>
                <RecordingDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;