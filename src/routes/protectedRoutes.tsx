import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { PrivateLayout } from "@/shared/components/templates/PrivateLayout";
import { AuthContext } from "@/shared/context/AuthContext";

export function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isLoggedIn ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
