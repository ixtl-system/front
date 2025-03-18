import { useState } from "react";
import { Button, Input } from "antd";

import { IPage } from "@/pages/auth";
import { ForgotPasswordFormContainer } from "./styles";

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
    <ForgotPasswordFormContainer>
      <h1>IXTL</h1>
      <h4>Recuperar Senha</h4>

      <section className="form">
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="primary" onClick={handleForgotPassword}>Recuperar Senha</Button>

        <section className="login-options">
          <Button onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </Button>
          <Button onClick={() => onNavigate("signUp")}>
            Criar uma nova conta
          </Button>
        </section>
      </section>
    </ForgotPasswordFormContainer>
  );
};
