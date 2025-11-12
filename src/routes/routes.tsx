import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "@/pages/auth";
import { ActivateAccount } from "@/pages/auth/ActivateAccount";
import { ProtectedRoutes } from "@/routes/protectedRoutes";
import { NotFound } from "@/shared/pages/notFound";

import { eventsRouter } from "./eventsRouter";
import { usersRouter } from "./usersRouter";

export const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/active-account/:userId/:activationToken", element: <ActivateAccount /> },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      ...eventsRouter,
      ...usersRouter,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
