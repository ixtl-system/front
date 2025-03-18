import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes/routes";
import { ContextProvider } from "@/shared/context/";

export function App() {
  return (
    <HelmetProvider>
      <ContextProvider>
        <Helmet titleTemplate="%s | ixtl" />
        <RouterProvider router={router} />
      </ContextProvider>
    </HelmetProvider>
  );
}
