import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, notification } from "antd";
import dayjs from "dayjs";
import { CalendarIcon, Clock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled";
import { CustomTextArea } from "@/shared/components/CustomTextArea";
import { useEvent } from "@/shared/hooks/useEvent";

import { EventFormData, eventSchema } from "./schema";
import { BackButton, ButtonContainer, DualFieldRow, FieldsWrapper, SaveButton, StyledDatePicker, StyledModal, StyledTimePicker } from "./styles";

interface CreateEventModalProps {
  visible: boolean
  onClose: () => void
}

export const CreateEventModal = ({ visible, onClose }: CreateEventModalProps) => {
  const { eventTypes, createEvent, fetchEvents } = useEvent();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      availability: "",
      date: "",
      time: "",
    },
  })

  const selectedDate = watch("date") ?? "";
  const parsedSelectedDate = dayjs(selectedDate);
  const isPastDate = parsedSelectedDate.isValid() && parsedSelectedDate.isBefore(dayjs().startOf("day"), "day");
  const isDateInvalid = !selectedDate || !parsedSelectedDate.isValid() || isPastDate;
  const isFormInvalid = !isValid || isDateInvalid || isSubmitting;

  const handleCancel = () => {
    reset();
    onClose();
  };

  async function handleCreateEvent(data: EventFormData) {
    const formattedDate = `${data.date}T${data.time}:00`;

    const request = {
      availability: Number(data.availability),
      date: formattedDate,
      description: data.description,
      eventTypeId: data.eventTypeId,
      name: data.name,
    };

    const { success, message } = await createEvent(request);
    if (!success) return notification.error({ message: message?.title, description: message?.description });

    notification.success({ message: message?.title, description: message?.description });
    reset();
    onClose();
    fetchEvents();
  }

  return (
    <StyledModal
      open={visible}
      onCancel={handleCancel}
      closable={false}
      width={900}
      height={600}
      centered
      footer={null}
    >
      <CustomTitle>{"Criar um evento"}</CustomTitle>
      <CustomSubtitle>Preencha todas as informações</CustomSubtitle>

      <form className="event-form" onSubmit={handleSubmit(handleCreateEvent)}>
        <FieldsWrapper>
          <Form.Item validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
            <CustomInput placeholder="Nome" register={register} name={"name"} />
          </Form.Item>

          <Form.Item validateStatus={errors.description ? "error" : ""} help={errors.description?.message}>
            <CustomTextArea placeholder="Descrição" rows={6} register={register} name="description" />
          </Form.Item>

          <DualFieldRow>
            <Form.Item validateStatus={errors.eventTypeId ? "error" : ""} help={errors.eventTypeId?.message}>
              <CustomSelect
                name="eventTypeId"
                control={control}
                placeholder="Selecione o tipo de evento"
                options={eventTypes.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              />
            </Form.Item>

            <Form.Item validateStatus={errors.availability ? "error" : ""} help={errors.availability?.message}>
              <Controller
                name="availability"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    name="availability"
                    placeholder="Quantidade de vagas disponíveis"
                    inputMode="numeric"
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
          </DualFieldRow>

          <DualFieldRow>
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
                    value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                    onChange={(dateValue) => field.onChange(dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : "")}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </Form.Item>

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
          <BackButton type="button" onClick={handleCancel}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Voltar
          </BackButton>

          <SaveButton type="submit" disabled={isFormInvalid}>
            Salvar evento
            <SaveOutlined style={{ marginLeft: 8 }} />
          </SaveButton>
        </ButtonContainer>
      </form>
    </StyledModal>
  )
}
