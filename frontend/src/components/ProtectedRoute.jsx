import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

function ProtectedRoute({ children }) {
  const [authUser] = useAuth();

  if (!authUser) {
    toast.error("Please log in first.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
