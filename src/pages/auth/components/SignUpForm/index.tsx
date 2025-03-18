import { useState } from "react";
import { Button, Input, message } from "antd";

import { IPage } from "@/pages/auth";
import { api } from "@/shared/infra/api";
import { SignUpFormContainer } from "./styles";

interface ISignUpProps {
  onNavigate: (page: IPage) => void;
}

export const SignUpForm = ({ onNavigate }: ISignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    if (email && password) {
      try {
        await api.post("/users", { email, password });
        message.success("Criando conta");

        setTimeout(() => {
          onNavigate("signIn");
        }, 1000)
      } catch (error: any) {
        message.error(error.response.data.message);
      }
    } else {
      console.log("Falta coisa");
    }
  }

  return (
    <SignUpFormContainer>
      <h1>IXTL</h1>
      <h4>Cadastre-se agora</h4>

      <section className="form">
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={handleSignUp}>Cadastre-se</Button>

        <section className="login-options">
          <Button onClick={() => onNavigate("forgotPassword")}>
            Esqueceu a senha?
          </Button>

          <Button onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </Button>
        </section>
      </section>
    </SignUpFormContainer>
  );
};
