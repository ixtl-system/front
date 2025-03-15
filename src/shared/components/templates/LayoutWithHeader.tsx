import { Header } from "../header/Header";

export function LayoutWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
