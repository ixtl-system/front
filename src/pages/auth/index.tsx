import { useState } from "react";

import IxtlLogoMd from "@/assets/logo-md.png";
import { ForgotPasswordForm } from "@/pages/auth/components/forgotPasswordForm";
import { SignInForm } from "@/pages/auth/components/SignInForm";
import { SignUpForm } from "@/pages/auth/components/SignUpForm";
import { SignContainer } from "./styles";

export type IPage = "signIn" | "signUp" | "forgotPassword";

export function SignIn() {
  const [page, setPage] = useState<IPage>("signIn");

  const pages = {
    signIn: <SignInForm onNavigate={setPage} />,
    signUp: <SignUpForm onNavigate={setPage} />,
    forgotPassword: <ForgotPasswordForm onNavigate={setPage} />,
  };

  return (
    <SignContainer>
      <div className="content">
        <img src={IxtlLogoMd} alt="logo-md" />
        {pages[page]}
      </div>
    </SignContainer>
  );
}
