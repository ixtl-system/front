import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { IPage } from "@/pages/auth";
import { AuthContext } from "@/shared/context/AuthContext";
import { Button, Input, message } from "antd";
import { SignInFormContainer } from "./styles";

interface ISignInProps {
  onNavigate: (page: IPage) => void;
}

export const SignInForm = ({ onNavigate }: ISignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignIn, isLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/events";

  async function handleSignIn() {
    if (email && password) {
      try {
        await SignIn({ email, password });
        navigate("/events");
      } catch (error) {
        message.error("Faltando credenciais");
      }
    }
  }

  if (!isLoggedIn) {
    return (
      <SignInFormContainer>
        <h1>IXTL</h1>
        <h4>Faça login para continuar</h4>

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
          <Button type="primary" onClick={handleSignIn}>Entrar</Button>

          <section className="login-options">
            <Button onClick={() => onNavigate("forgotPassword")}>
              Esqueceu a senha?
            </Button>

            <Button onClick={() => onNavigate("signUp")}>
              Criar uma nova conta
            </Button>
          </section>
        </section>
      </SignInFormContainer>
    );
  } else {
    return <Navigate to={from} />;
  }
};
