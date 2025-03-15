import "./styles.css";

import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { ForgotPasswordForm } from "@/pages/auth/components/forgotPasswordForm";
import { SignInForm } from "@/pages/auth/components/SignInForm";
import { SignUpForm } from "@/pages/auth/components/SignUpForm";

export type IPage = "signIn" | "signUp" | "forgotPassword";

export function SignIn() {
  const [page, setPage] = useState<IPage>("signIn");

  const pages = {
    signIn: <SignInForm onNavigate={setPage} />,
    signUp: <SignUpForm onNavigate={setPage} />,
    forgotPassword: <ForgotPasswordForm onNavigate={setPage} />,
  };

  return (
    <div className="sign-container">
      <Helmet title="Login" />
      <div className="content">
        <section className="background" />

        {pages[page]}
      </div>
    </div>
  );
}
