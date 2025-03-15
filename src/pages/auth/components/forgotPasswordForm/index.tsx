import "./styles.css";

import { useState } from "react";

import { IPage } from "@/pages/auth";

interface IForgotPasswordProps {
  onNavigate: (page: IPage) => void;
}

export const ForgotPasswordForm = ({ onNavigate }: IForgotPasswordProps) => {
  const [email, setEmail] = useState("");

  function handleForgotPassword() {
    if (email) {
      console.log("email: ", email);
      console.log("Enviando email");
    } else {
      console.log("Email não registrado");
    }
  }
  return (
    <div className="forgot-password-form-container">
      <h1>IXTL</h1>
      <h4>Recuperar Senha</h4>

      <section className="form">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleForgotPassword}>Recuperar Senha</button>

        <section className="login-options">
          <button onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </button>
          <button onClick={() => onNavigate("signUp")}>
            Criar uma nova conta
          </button>
        </section>
      </section>
    </div>
  );
};
