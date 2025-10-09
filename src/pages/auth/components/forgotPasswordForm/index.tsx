import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { IPage } from "@/pages/auth";
import { CustomInput } from "@/shared/components/CustomInput";

import { ErrorMessage, OptionsButton, SignInButton, Subtitle, Title } from "../../styles";
import { ForgotPasswordFormData, forgotPasswordSchema } from "./schema";
import { ForgotPasswordFormContainer } from "./styles";

interface IForgotPasswordProps {
  onNavigate: (page: IPage) => void;
}

export const ForgotPasswordForm = ({ onNavigate }: IForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  function onSubmit({ email }: ForgotPasswordFormData) {
    if (email) {
      message.success("Verifique sua caixa de entrada!");
    } else {
      message.error("Informe um email válido.");
    }
  }

  return (
    <ForgotPasswordFormContainer>
      <Helmet title="Recuperar Senha" />

      <Title>Esqueceu sua senha?</Title>
      <Subtitle className="subtitle">Informe seu email e enviaremos instruções</Subtitle>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="email"
          placeholder="Email"
          register={register}
        />
        {errors.email?.message ? <ErrorMessage>{errors.email?.message}</ErrorMessage> : null}

        <SignInButton type="submit">Recuperar senha</SignInButton>

        <section className="login-options">
          <OptionsButton onClick={() => onNavigate("signIn")}>
            Já tem uma conta?
          </OptionsButton>

          <OptionsButton onClick={() => onNavigate("signUp")}>
            Criar uma nova conta
          </OptionsButton>
        </section>
      </form>
    </ForgotPasswordFormContainer>
  );
};
