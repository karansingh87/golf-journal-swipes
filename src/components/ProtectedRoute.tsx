import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we set up your session.</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};