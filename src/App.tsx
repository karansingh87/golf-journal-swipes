import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";
import Notes from "@/pages/Notes";
import RecordingDetail from "@/pages/RecordingDetail";
import Playbook from "@/pages/Playbook";
import CoachNoteDetail from "@/pages/CoachNoteDetail";
import PepTalkDetail from "@/pages/PepTalkDetail";
import Trends from "@/pages/Trends";
import Onboarding from "@/pages/Onboarding";
import Settings from "@/pages/Settings";
import Admin from "@/pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/notes",
    element: <ProtectedRoute><Notes /></ProtectedRoute>,
  },
  {
    path: "/notes/:id",
    element: <ProtectedRoute><RecordingDetail /></ProtectedRoute>,
  },
  {
    path: "/playbook",
    element: <ProtectedRoute><Playbook /></ProtectedRoute>,
  },
  {
    path: "/coach_notes/:id",
    element: <ProtectedRoute><CoachNoteDetail /></ProtectedRoute>,
  },
  {
    path: "/pep_talk/:id",
    element: <ProtectedRoute><PepTalkDetail /></ProtectedRoute>,
  },
  {
    path: "/trends",
    element: <ProtectedRoute><Trends /></ProtectedRoute>,
  },
  {
    path: "/onboarding",
    element: <ProtectedRoute><Onboarding /></ProtectedRoute>,
  },
  {
    path: "/settings",
    element: <ProtectedRoute><Settings /></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><Admin /></ProtectedRoute>,
  },
]);

export default router;
