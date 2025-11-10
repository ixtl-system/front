import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { notification } from "antd"
import { Form } from "antd"
import dayjs from "dayjs"
import { CalendarIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { CustomInput } from "@/shared/components/CustomInput"
import { CustomSelect } from "@/shared/components/CustomSelect"
import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled"
import { CustomTextArea } from "@/shared/components/CustomTextArea"
import { useEvent } from "@/shared/hooks/useEvent"

import { EventFormData, eventSchema } from "./schema";
import { BackButton, ButtonContainer, SaveButton, StyledDatePicker,StyledModal } from "./styles"

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
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  })

  const handleCancel = () => {
    reset()
    onClose()
  }

  async function handleCreateEvent(data: EventFormData) {
    const request = {
      ...data,
      availability: Number(data.availability),
      date: data.date,
    }

    const { success, message } = await createEvent(request);
    if (!success) return notification.error({ message: message?.title, description: message?.description });

    notification.success({ message: message?.title, description: message?.description });
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

      <form onSubmit={handleSubmit(handleCreateEvent)}>
        <Form.Item validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
          <CustomInput placeholder="Nome" register={register} name={"name"} />
        </Form.Item>

        <Form.Item validateStatus={errors.description ? "error" : ""} help={errors.description?.message}>
          <CustomTextArea placeholder="Descrição" rows={6} register={register} name="description" />
        </Form.Item>

        <Form.Item validateStatus={errors.availability ? "error" : ""} help={errors.availability?.message}>
          <CustomInput type="number" placeholder="Quantidade de lugares disponíveis" register={register} name={"availability"} />
        </Form.Item>

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

        <Form.Item validateStatus={errors.date ? "error" : ""} help={errors.date?.message}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <StyledDatePicker
                placeholder="Data do evento"
                format="DD/MM/YYYY"
                size="large"
                suffixIcon={<CalendarIcon size={16} />}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => date ? field.onChange(String(date).toString()) : field.onChange("")}
              />
            )}
          />
        </Form.Item>

        <ButtonContainer>
          <BackButton type="button" onClick={handleCancel}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Voltar
          </BackButton>

          <SaveButton type="submit">
            Salvar evento
            <SaveOutlined style={{ marginLeft: 8 }} />
          </SaveButton>
        </ButtonContainer>
      </form>
    </StyledModal>
  )
}
