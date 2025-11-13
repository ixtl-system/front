import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, notification, Space } from "antd";
import dayjs from "dayjs";
import { CalendarIcon, Clock } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled";
import { CustomTextArea } from "@/shared/components/CustomTextArea";
import { useEvent } from "@/shared/hooks/useEvent";

import {
  BackButton,
  ButtonContainer,
  DualFieldRow,
  FieldsWrapper,
  SaveButton,
  StyledDatePicker,
  StyledModal,
  StyledTimePicker
} from "../CreateEventModal/styles";
import { EditEventFormData, editEventSchema } from "./schema";

type EditEventModalProps = {
  visible: boolean;
  onClose: () => void;
  eventId?: string;
};

export const EditEventModal = ({ visible, onClose, eventId }: EditEventModalProps) => {
  const navigate = useNavigate();
  const { event, updateEvent, fetchEvent, fetchEvents } = useEvent();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, dirtyFields, isSubmitting, isValid, isDirty },
  } = useForm<EditEventFormData>({
    resolver: zodResolver(editEventSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      availability: "",
      date: "",
      time: "",
    },
  });

  const setFormValuesFromEvent = useCallback(() => {
    if (!event || !event.id) {
      reset({
        name: "",
        description: "",
        availability: "",
        date: "",
        time: "",
      }, { keepDirty: false });
      return;
    }

    const parsedDate = dayjs(event.date);

    reset({
      name: event.name ?? "",
      description: event.description ?? "",
      availability: String(event.availability ?? ""),
      date: parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : "",
      time: parsedDate.isValid() ? parsedDate.format("HH:mm") : "",
    }, { keepDirty: false });
  }, [event, reset]);

  useEffect(() => {
    if (visible) {
      setFormValuesFromEvent();
    }
  }, [visible, setFormValuesFromEvent]);

  const selectedDate = watch("date") ?? "";
  const parsedSelectedDate = dayjs(selectedDate);
  const isPastDate = parsedSelectedDate.isValid() && parsedSelectedDate.isBefore(dayjs().startOf("day"), "day");
  const isDateInvalid = !selectedDate || !parsedSelectedDate.isValid() || isPastDate;

  const hasChanges = isDirty;
  const isSaveDisabled = !hasChanges || !isValid || isDateInvalid || isSubmitting;

  const handleCancel = () => {
    setFormValuesFromEvent();
    onClose();
  };

  const onSubmit = async (formData: EditEventFormData) => {
    if (!eventId) return;

    const payload: Record<string, string | number> = {};

    if (dirtyFields.name) payload.name = formData.name;
    if (dirtyFields.description) payload.description = formData.description;
    if (dirtyFields.availability) payload.availability = Number(formData.availability);

    const shouldUpdateDate = Boolean(dirtyFields.date) || Boolean(dirtyFields.time);
    if (shouldUpdateDate) {
      payload.date = `${formData.date}T${formData.time}:00`;
    }

    if (!Object.keys(payload).length) return;

    const { success, message } = await updateEvent(eventId, payload);

    if (!success) {
      const notificationKey = "update-event-error";

      notification.error({
        key: notificationKey,
        message: message?.title,
        description: message?.description,
        btn: (
          <Space>
            {message?.actions?.includes("retry") ? (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  notification.destroy(notificationKey);
                  handleSubmit(onSubmit)();
                }}
              >
                Tentar novamente
              </Button>
            ) : null}

            {message?.actions?.includes("redirect-to-events") ? (
              <Button
                size="small"
                onClick={() => {
                  notification.destroy(notificationKey);
                  navigate("/events");
                }}
              >
                Ver eventos
              </Button>
            ) : null}
          </Space>
        ),
      });

      return;
    }

    notification.success({
      message: message?.title ?? "Evento atualizado com sucesso!",
      description: "As informações do evento foram atualizadas.",
    });

    await Promise.allSettled([fetchEvent(eventId), fetchEvents()]);
    setFormValuesFromEvent();
    onClose();
  };

  return (
    <StyledModal
      open={visible}
      onCancel={handleCancel}
      closable={false}
      width={900}
      height={600}
      centered
      footer={null}
      destroyOnClose
    >
      <CustomTitle>{"Editar evento"}</CustomTitle>
      <CustomSubtitle>Atualize somente os campos que precisar</CustomSubtitle>

      <form className="event-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldsWrapper>
          <Form.Item validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
            <CustomInput placeholder="Nome" register={register} name="name" disabled={isSubmitting} />
          </Form.Item>

          <Form.Item validateStatus={errors.description ? "error" : ""} help={errors.description?.message}>
            <CustomTextArea placeholder="Descrição" rows={6} register={register} name="description" disabled={isSubmitting} />
          </Form.Item>

          <DualFieldRow>
            <Form.Item validateStatus={errors.availability ? "error" : ""} help={errors.availability?.message}>
              <Controller
                name="availability"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    name="availability"
                    placeholder="Quantidade de vagas disponíveis"
                    inputMode="numeric"
                    disabled={isSubmitting}
                    value={field.value ?? ""}
                    onChange={(event) => {
                      const sanitizedValue = event.target.value.replace(/\D/g, "");
                      field.onChange(sanitizedValue);
                    }}
                    onBlur={(event) => {
                      field.onBlur();
                      const safeValue = Math.max(1, Number(event.target.value) || 1);
                      field.onChange(String(safeValue));
                    }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item validateStatus={errors.date ? "error" : ""} help={errors.date?.message}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <StyledDatePicker
                    placeholder="Data do evento"
                    format="DD/MM/YYYY"
                    inputReadOnly
                    suffixIcon={<CalendarIcon size={16} />}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                    disabled={isSubmitting}
                    value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                    onChange={(dateValue) => field.onChange(dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : "")}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </Form.Item>
          </DualFieldRow>

          <DualFieldRow>
            <Form.Item validateStatus={errors.time ? "error" : ""} help={errors.time?.message}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <StyledTimePicker
                    format="HH:mm"
                    minuteStep={5}
                    inputReadOnly
                    suffixIcon={<Clock size={16} />}
                    disabled={isSubmitting}
                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                    onChange={(timeValue) => field.onChange(timeValue ? timeValue.format("HH:mm") : "")}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </Form.Item>
          </DualFieldRow>
        </FieldsWrapper>

        <ButtonContainer>
          <BackButton type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancelar
          </BackButton>

          <SaveButton type="submit" disabled={isSaveDisabled}>
            {isSubmitting ? (
              <>
                <LoadingOutlined style={{ marginRight: 8 }} />
                Salvando...
              </>
            ) : (
              <>
                Salvar alterações
                <SaveOutlined style={{ marginLeft: 8 }} />
              </>
            )}
          </SaveButton>
        </ButtonContainer>
      </form>
    </StyledModal>
  );
};
