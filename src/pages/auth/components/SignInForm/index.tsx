import "./styles.css";

import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { IPage } from "@/pages/auth";
import { AuthContext } from "@/shared/context/AuthContext";

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
        SignIn({ email, password });
        navigate("/events");
      } catch (error) {
        window.alert("Faltando credenciais");
      }
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="sign-in-form-container">
        <h1>IXTL</h1>
        <h4>Login to your account</h4>

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
          <button onClick={handleSignIn}>Entrar</button>

          <section className="login-options">
            <button onClick={() => onNavigate("forgotPassword")}>
              Esqueceu a senha?
            </button>

            <button onClick={() => onNavigate("signUp")}>
              Criar uma nova conta
            </button>
          </section>
        </section>
      </div>
    );
  } else {
    return <Navigate to={from} />;
  }
};
