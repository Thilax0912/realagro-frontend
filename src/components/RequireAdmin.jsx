import { Navigate, useLocation } from "react-router-dom";
import { isAdmin } from "../lib/auth";

export default function RequireAdmin({ children }) {
  const ok = isAdmin();
  const loc = useLocation();
  if (!ok) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
