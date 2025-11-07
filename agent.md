# iXTL Frontend Agent Guidelines

## Tooling & Commands
- This project runs on **Vite + React + TypeScript**. Keep Node.js 18+ in mind when adding tooling.
- Use **yarn scripts**

## Project Structure
- `src/pages` contains page-level features grouped by domain (authentication, events, user, etc.). New routes should live inside the appropriate domain folder and expose an `index.tsx` entry plus co-located helpers.
- `src/shared` gathers cross-cutting utilities:
  - `components/` holds reusable UI pieces (custom inputs, layout, modal, etc.). Keep component-specific styling in a sibling `styles.ts` file using **styled-components**.
  - `context/` provides global state (Auth, User, Event, Diseases, Surgeries, Profile). When creating new shared state:
    1. Add a provider to this directory.
    2. Register it inside `src/shared/context/index.tsx` so `ContextProvider` wires it into the app.
    3. Expose a typed hook from `src/shared/hooks` (e.g., `useEvent`) that wraps `useContext` and throws if used outside the provider.
  - `infra/` contains the configured Axios instance (`api`) and interceptors. Always reuse this client so interceptors remain active.
  - `types/` stores shared DTOs and domain models. Page-specific DTOs can live under `src/pages/<domain>/dtos` and re-export relevant types from `index.ts` files where possible.
  - `utils/` & `validations/` collect helper functions and zod/React Hook Form schemas. Prefer reusing or extending these helpers instead of duplicating logic.
- `src/routes` defines route slices. Add new protected routes to the appropriate router file (`eventsRouter.tsx`, `usersRouter.tsx`, etc.) and ensure they are composed inside `routes.tsx`.
- Assets (images, SVG wrappers, icons) belong in `src/assets`. Keep new icons under `src/assets/icons` and export them as React components when needed.

## Coding Conventions
- Use **functional components** with arrow functions (`export const Foo = () => { ... }`) unless a function declaration is already established in the target file.
- Prefer **double quotes** for strings and terminate statements with semicolons.
- Import application modules via the `@/` alias instead of long relative paths (configured through Vite + TypeScript).
- Keep UI copy in Portuguese unless the surrounding feature is already localized differently.
- Set document titles with `<Helmet>` inside page components.
- When touching authentication-sensitive flows, preserve the localStorage-based token handling and Axios Authorization header updates implemented in `AuthContext`.

## Forms & Validation
- Forms rely on **React Hook Form** + **Zod** resolvers. Define schemas next to the form (usually inside `validations/`) and share inferred types with DTO definitions.
- Normalize user input (CPF, RG, phone) using the helpers in `src/shared/utils` before sending data to the API.
- Use the custom form components (`CustomInput`, `CustomSelect`, `CustomTextArea`, etc.) instead of raw Ant Design fields to keep styling consistent.

## Styling & Layout
- Styling is handled with **styled-components**. Co-locate styles in a `styles.ts` file and import them into the component entry.
- Reuse layout templates (`shared/components/templates/PrivateLayout`, `LayoutWithHeader`) to keep navigation, sidebar, and topbar consistent.
- For responsive behavior, follow the breakpoints and patterns already used in existing stylesheets.

## Data Fetching & Side Effects
- Always use the shared Axios instance (`api`) from `src/shared/infra/api`. Do not create ad-hoc clients.
- Surface user feedback with Ant Design's `message` component or existing feedback patterns.
- Handle loading states using the shared `Loader` component when async calls block UI sections.

## Routing & Access Control
- Pages that require authentication must render inside `<ProtectedRoutes>` so they receive the `PrivateLayout` shell. Public pages (e.g., SignIn) stay outside the protected tree.
- When adding a new protected page, wire it through the corresponding router module and export any required modals/components from the page folder.

## Global Error Handling
Global error interception is centralized in `src/shared/infra/`:

### `errorInterceptor.ts`
```ts
import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  const unAuthRoutes = [401, 403];
  const status = error.response?.status;
  const isUserAuthenticated = localStorage.getItem("token");

  if (status && unAuthRoutes.includes(status) && isUserAuthenticated) {
    localStorage.clear();
    window.open("/", "_self");
  }

  return Promise.reject(error);
};
```

### `api.ts`
```ts
import axios from "axios";
import { errorInterceptor } from "./interceptors/errorInterceptor";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.response.use(config => config, errorInterceptor);
```

All API calls must use this shared Axios client to ensure authentication and global error handling remain consistent.

## Testing & Quality
- Unit/component tests use **Vitest** + React Testing Library. Co-locate new tests next to the component (`ComponentName.test.tsx`) or under a `__tests__` folder.
- Prefer testing user-visible behavior (forms, API interaction success/failure messaging) rather than implementation details.

## Documentation & Versioning
- Each time a change or fix is implemented, create a new Markdown file under the root-level `documents/` directory.
- The file name must follow the pattern:  
  **`<date>_<br-time(UTC-03:00)>-<doc_name>.md`**  
  Example: `25-11-07_20:22-listParticipantsCorrection.md`
- Inside the document, include:
  1. A summary of what was changed or fixed.
  2. A short explanation of *why* the change was necessary.
  3. If the request originated from the browser, include the **link to the chat** in the file.  
     If the request came from VS Code, write **“vscode”** instead.
- Do **not** overwrite existing documents — always create a new one for each change.

## Philosophy
This frontend codebase favors clarity over cleverness. Prefer explicit patterns, reuse existing helpers, and ensure components are accessible and testable. Every decision should optimize for maintainability, predictability, and onboarding.
