import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/ui/use-toast";
import Playbook from "@/pages/Playbook";
import CoachNoteDetail from "@/pages/CoachNoteDetail";
import PepTalkDetail from "./pages/PepTalkDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <Routes>
          <Route path="/" element={<Playbook />} />
          <Route path="/coach_notes/:id" element={<CoachNoteDetail />} />
          <Route path="/pep_talk/:id" element={<PepTalkDetail />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;