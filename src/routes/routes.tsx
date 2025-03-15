import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "@/pages/auth";
// import { EventList } from "@/pages/events/eventList";
// import { EventRegister } from "@/pages/events/eventRegister";
// import { Profile } from "@/pages/users";
import { ProtectedRoutes } from "@/routes/protectedRoutes";
import { NotFound } from "@/shared/pages/notFound";

import { eventsRouter } from "./eventsRouter";
import { usersRouter } from "./usersRouter";

export const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
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
