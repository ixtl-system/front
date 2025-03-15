import "./styles.css";

import { useState } from "react";

import { IPage } from "@/pages/auth";
import { api } from "@/shared/infra/api";

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
        window.alert("Criando conta");
      } catch (error: any) {
        window.alert(error.response.data.message);
      }
    } else {
      console.log("Falta coisa");
    }
  }

  return (
    <div className="sign-up-form-container">
      <h1>IXTL</h1>
      <h4>Register</h4>

      <section className="form">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Cadastre-se</button>

        <section className="login-options">
          <button onClick={() => onNavigate("forgotPassword")}>
            Esqueceu a senha?
          </button>

          <button onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </button>
        </section>
      </section>
    </div>
  );
};
