import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../auth/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
