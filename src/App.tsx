import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "./components/ui/toaster";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { supabase } from "./integrations/supabase/client";
import Record from "./pages/Record";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/record" element={<Record />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <Toaster />
          </Router>
        </ThemeProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;