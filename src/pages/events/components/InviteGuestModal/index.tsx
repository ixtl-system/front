import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Switch, notification } from "antd";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled";
import { useEvent } from "@/shared/hooks/useEvent";
import { CreateEventInvitationPayload } from "@/shared/types/Event";

import { InviteGuestFormData, inviteGuestSchema } from "./schema";
import {
  ActionsRow,
  BackButton,
  StatusBadge,
  StatusPreview,
  StyledModal,
  SubmitButton,
  SwitchLabel,
  SwitchRow,
} from "./styles";

interface InviteGuestModalProps {
  visible: boolean;
  onClose: () => void;
}

const GENDER_OPTIONS = [
  { label: "Masculino", value: "MASCULINE" },
  { label: "Feminino", value: "FEMININE" },
  { label: "Outro", value: "OTHER" },
];

export const InviteGuestModal = ({ visible, onClose }: InviteGuestModalProps) => {
  const params = useParams<{ id: string }>();
  const { createEventInvitation, fetchEvent } = useEvent();

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InviteGuestFormData>({
    resolver: zodResolver(inviteGuestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      firstTimer: false,
      hasPaid: false,
    },
  });

  const hasPaid = watch("hasPaid");

  const statusLabel = useMemo(
    () => (hasPaid ? "Confirmado" : "Reservado"),
    [hasPaid],
  );

  const statusValue = useMemo(
    () => (hasPaid ? "CONFIRMED" : "RESERVED"),
    [hasPaid],
  );

  const handleCancel = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: InviteGuestFormData) => {
    const eventId = params.id;

    if (!eventId) {
      notification.error({
        message: "Evento não encontrado",
        description: "Não foi possível identificar o evento para o convite.",
      });
      return;
    }

    const payload: CreateEventInvitationPayload = {
      name: data.name,
      hasPaid: data.hasPaid,
      status: statusValue,
    };

    if (data.email) payload.email = data.email;
    if (data.phone) payload.phone = data.phone.replace(/\D/g, "");
    if (data.gender && typeof data.gender === "string") payload.gender = data.gender;
    if (data.firstTimer) payload.firstTimer = data.firstTimer;

    const response = await createEventInvitation(eventId, payload);

    if (!response.success) {
      notification.error({
        message: response.message?.title || "Erro ao criar convite",
        description: response.message?.description,
      });
      return;
    }

    notification.success({
      message: response.message?.title || "Convite criado",
      description: response.message?.description,
    });

    await fetchEvent(eventId);
    reset({
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      firstTimer: false,
      hasPaid: false,
    });
    onClose();
  };

  return (
    <StyledModal
      open={visible}
      onCancel={handleCancel}
      closable={false}
      width={720}
      centered
      footer={null}
      destroyOnClose
      keyboard
    >
      <CustomTitle>Convidar participante</CustomTitle>
      <CustomSubtitle>Reserve uma vaga para um convidado administrador.</CustomSubtitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
          <CustomInput placeholder="Nome completo" register={register} name="name" />
        </Form.Item>

        <Form.Item validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
          <CustomInput placeholder="E-mail" type="email" register={register} name="email" />
        </Form.Item>

        <Form.Item validateStatus={errors.phone ? "error" : ""} help={errors.phone?.message}>
          <CustomInput placeholder="Telefone" register={register} name="phone" />
        </Form.Item>

        <Form.Item>
          <CustomSelect
            name="gender"
            control={control}
            placeholder="Gênero (opcional)"
            options={GENDER_OPTIONS}
            allowClear
            onClear={() => setValue("gender", undefined)}
          />
        </Form.Item>

        <Controller
          name="firstTimer"
          control={control}
          render={({ field }) => (
            <SwitchRow>
              <SwitchLabel>
                Primeira cerimônia?
                <small>Marque se esta é a primeira participação do convidado.</small>
              </SwitchLabel>
              <Switch
                checked={Boolean(field.value)}
                onChange={(checked) => field.onChange(checked)}
                aria-label="Primeira cerimônia?"
              />
            </SwitchRow>
          )}
        />

        <Controller
          name="hasPaid"
          control={control}
          render={({ field }) => (
            <SwitchRow>
              <SwitchLabel>
                Pagamento confirmado?
                <small>Pagamentos confirmados geram status CONFIRMED automaticamente.</small>
              </SwitchLabel>
              <Switch
                checked={Boolean(field.value)}
                onChange={(checked) => field.onChange(checked)}
                aria-label="Pagamento confirmado?"
              />
            </SwitchRow>
          )}
        />

        <StatusPreview>
          <SwitchLabel>
            Status do registro
            <small>Definido conforme o pagamento informado.</small>
          </SwitchLabel>
          <StatusBadge>{statusLabel}</StatusBadge>
        </StatusPreview>

        <ActionsRow>
          <BackButton type="button" onClick={handleCancel}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Voltar
          </BackButton>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Criar convite
            <SendOutlined style={{ marginLeft: 8 }} />
          </SubmitButton>
        </ActionsRow>
      </form>
    </StyledModal>
  );
};
