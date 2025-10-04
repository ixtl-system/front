import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "@/pages/auth";
import { LandingPage } from "@/pages/landing";
import { ProtectedRoutes } from "@/routes/protectedRoutes";
import { NotFound } from "@/shared/pages/notFound";

import { eventsRouter } from "./eventsRouter";
import { usersRouter } from "./usersRouter";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <SignIn /> },
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
