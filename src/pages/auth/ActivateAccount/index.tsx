import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/shared/components/Loader";
import { api } from "@/shared/infra/api";

import {
  ActionButton,
  ActivationCard,
  ActivationContainer,
  ModalActions,
  ModalMessage,
  ModalTitle,
  StyledModal,
  SupportText,
} from "./styles";

type ActivationParams = {
  userId?: string;
  activationToken?: string;
};

const CONTACT_URL = "https://www.instagram.com/instituto.trabalhadoresdaluz/?locale=pt_BR&hl=am-et";
const ACTIVATION_PATH = "/users/active-account";

export const ActivateAccount = () => {
  const navigate = useNavigate();
  const { userId, activationToken } = useParams<ActivationParams>();

  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (!userId || !activationToken) {
      navigate("/", { replace: true });
      return;
    }

    let isMounted = true;

    const activateAccount = async () => {
      try {
        const response = await api.post(`${ACTIVATION_PATH}/${userId}/${activationToken}`);

        if (response.status === 204 || response.status === 200) {
          setIsSuccessModalOpen(true);
          return;
        }

        throw new Error("Unexpected activation response");
      } catch (error) {
        if (!isMounted) return;

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 400 || status === 410) {
            setIsInvalidLink(true);
            return;
          }
        }

        message.error("Não foi possível ativar sua conta. Tente novamente mais tarde.");
        navigate("/", { replace: true });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    activateAccount();

    return () => {
      isMounted = false;
    };
  }, [activationToken, navigate, userId]);

  const handleGoToLogin = () => {
    navigate("/", { replace: true });
  };

  const handleEnterPortal = () => {
    setIsSuccessModalOpen(false);
    navigate("/", { replace: true, state: { openAuthModal: true, authPage: "signIn" } });
  };

  return (
    <ActivationContainer>
      <Helmet title="Ativar conta" />

      {isLoading ? (
        <Loader fullScreen />
      ) : (
        <ActivationCard>
          <span className="eyebrow">Portal Trabalhadores da Luz</span>
          <h1>Não conseguimos ativar sua conta automaticamente</h1>
          <p>Se o link de ativação estiver inválido, escolha uma das opções abaixo para seguir com apoio.</p>
          <SupportText>
            Caso precise de ajuda imediata, clique em &ldquo;Falar com o Instituto&rdquo; para abrir nosso canal de contato.
          </SupportText>
        </ActivationCard>
      )}

      <StyledModal
        centered
        closable={false}
        footer={null}
        maskClosable={false}
        open={isInvalidLink}
      >
        <ModalTitle>Link de ativação indisponível</ModalTitle>
        <ModalMessage>
          This activation link is no longer valid. Please contact Instituto Trabalhadores da Luz for assistance.
        </ModalMessage>

        <ModalActions>
          <ActionButton type="button" onClick={handleGoToLogin}>
            Ir para login
          </ActionButton>
          <ActionButton
            as="a"
            href={CONTACT_URL}
            rel="noreferrer"
            target="_blank"
            $variant="secondary"
          >
            Falar com o Instituto
          </ActionButton>
        </ModalActions>
      </StyledModal>

      <StyledModal
        centered
        closable={false}
        footer={null}
        maskClosable={false}
        open={isSuccessModalOpen}
      >
        <ModalTitle>Conta ativada com sucesso!</ModalTitle>
        <ModalMessage>Sua conta já está ativa. Você pode entrar agora para acessar o sistema.</ModalMessage>

        <ModalActions>
          <ActionButton type="button" autoFocus onClick={handleEnterPortal}>
            Entrar
          </ActionButton>
        </ModalActions>
      </StyledModal>
    </ActivationContainer>
  );
};
