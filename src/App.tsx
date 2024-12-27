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
import Trends from "./pages/Trends";
import Admin from "./pages/Admin";
import RecordingDetail from "./pages/RecordingDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(true);
  
  useEffect(() => {
    const validateSession = async () => {
      try {
        setIsValidating(true);
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session validation error:', error);
          throw error;
        }

        if (!currentSession) {
          console.log('No valid session found, redirecting to login');
          await supabase.auth.signOut();
          navigate('/login', { replace: true });
          return;
        }

        // Attempt to refresh the session
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error('Session refresh error:', refreshError);
          throw refreshError;
        }

      } catch (error) {
        console.error('Auth error:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in again to continue.",
        });
        await supabase.auth.signOut();
        navigate('/login', { replace: true });
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, [navigate, toast]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
            <Route path="/trends" element={
              <ProtectedRoute>
                <Trends />
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
            {/* Redirect /history to /notes */}
            <Route path="/history" element={<Navigate to="/notes" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;