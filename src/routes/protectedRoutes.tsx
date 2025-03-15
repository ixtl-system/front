import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "@/shared/context/AuthContext";

export function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
