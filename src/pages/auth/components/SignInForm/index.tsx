import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { IPage } from "@/pages/auth";
import { CustomInput } from "@/shared/components/CustomInput";
import { AuthContext } from "@/shared/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessage, OptionsButton, SignInButton, Subtitle, Title } from "../../styles";
import { SignInFormData, signInSchema } from "./schema";
import { SignInFormContainer } from "./styles";

interface ISignInProps {
  onNavigate: (page: IPage) => void;
}

export const SignInForm = ({ onNavigate }: ISignInProps) => {
  const { SignIn, isLoggedIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/events";

  async function onSubmit({ email, password }: SignInFormData) {
    if (!email && !password) return;
    
    await SignIn({ email, password });
    navigate("/events");
  }

  if (!isLoggedIn) {
    return (
      <SignInFormContainer>
        <Helmet title="Login" />

        <Title>Olá, acesse sua jornada!</Title>
        <Subtitle className="subtitle">Faça login para continuar</Subtitle>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="email"
            placeholder="Email"
            register={register}
          />
          {errors.email?.message ? <ErrorMessage>{errors.email?.message}</ErrorMessage> : null}

          <CustomInput
            type="password"
            name="password"
            placeholder="Senha"
            register={register}
          />
          {errors.password?.message ? <ErrorMessage>{errors.password?.message}</ErrorMessage> : null}

          <SignInButton type="submit">Entrar</SignInButton>
          <section className="login-options">
            <OptionsButton onClick={() => onNavigate("signUp")}>
              Criar nova conta
            </OptionsButton>
            
            <OptionsButton onClick={() => onNavigate("forgotPassword")}>
              Esqueceu a senha?
            </OptionsButton>
          </section>
        </form>
      </SignInFormContainer>
    );
  } else {
    return <Navigate to={from} />;
  }
};
