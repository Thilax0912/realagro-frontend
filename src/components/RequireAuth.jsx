import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const hasToken = !!localStorage.getItem("token");
  const loc = useLocation();
  if (!hasToken) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
