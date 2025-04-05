import { Controller, useForm } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import { notification } from "antd"
import { Form } from "antd"
import dayjs from "dayjs"

import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"

import { useEvent } from "@/shared/hooks/useEvent"
import { CustomInput } from "@/shared/components/CustomInput"
import { CustomTextArea } from "@/shared/components/CustomTextArea"

import { EventFormData, eventSchema } from "./schema";
import { StyledModal, Title, Subtitle, ButtonContainer, BackButton, SaveButton, StyledDatePicker } from "./styles"

interface CreateEventModalProps {
  visible: boolean
  onClose: () => void
}

export const CreateEventModal = ({ visible, onClose }: CreateEventModalProps) => {
  const { createEvent, fetchEvents } = useEvent();

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
      <Title>{"Criar um evento"}</Title>
      <Subtitle>Preencha todas as informações</Subtitle>

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
