import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { IPage } from "@/pages/auth";
import { CustomInput } from "@/shared/components/CustomInput";
import { AuthContext } from "@/shared/context/AuthContext";

import { ErrorMessage, OptionsButton, SignInButton, Subtitle, Title } from "../../styles";
import { SignUpFormData, signUpSchema } from "./schema";
import { SignUpFormContainer } from "./styles";

interface ISignUpProps {
  onNavigate: (page: IPage) => void;
}

export const SignUpForm = ({ onNavigate }: ISignUpProps) => {
  const { SignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  async function onSubmit({ email, password, confirmPassword }: SignUpFormData) {
    await SignUp({ email, password, confirmPassword });
  }

  return (
    <SignUpFormContainer>
      <Helmet title="Cadastro" />

      <Title>Olá, pronto para começar?</Title>
      <Subtitle>Crie sua conta e inicie sua jornada!</Subtitle>

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

        <CustomInput
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de Senha"
          register={register}
        />
        {errors.confirmPassword?.message ? <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage> : null}

        <SignInButton type="submit">Cadastre-se</SignInButton>

        <section className="login-options">
          <OptionsButton onClick={() => onNavigate("forgotPassword")}>
            Esqueceu a senha?
          </OptionsButton>

          <OptionsButton onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </OptionsButton>
        </section>
      </form>
    </SignUpFormContainer>
  );
};
