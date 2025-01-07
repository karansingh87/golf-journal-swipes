import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Notes from "@/pages/Notes";
import Trends from "@/pages/Trends";
import Admin from "@/pages/Admin";
import Settings from "@/pages/Settings";
import Onboarding from "@/pages/Onboarding";
import RecordingDetail from "@/pages/RecordingDetail";
import CoachingNotesDetail from "@/components/coaching-notes/CoachingNotesDetail";
import Playbook from "@/pages/Playbook";
import NavigationBar from "@/components/NavigationBar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<RecordingDetail />} />
            <Route path="/coaching-notes/:id" element={<CoachingNotesDetail />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;