import { Form, Input } from "antd"
import { CalendarIcon } from "lucide-react"
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { BackButton, ButtonContainer, SaveButton, StyledDatePicker, StyledModal, Subtitle, TextArea, Title } from "./styles"

export const CreateEventModal = ({ visible, onClose }: any) => {
  const [form] = Form.useForm()

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values)
      form.resetFields()
      onClose()
    })
  }

  return (
    <StyledModal open={visible} onCancel={handleCancel} footer={null} width={500} centered closable={false}>
      <Title>Criar um evento</Title>
      <Subtitle>Preencha todas as informações</Subtitle>

      <Form form={form} layout="vertical">
        <Form.Item name="name" rules={[{ required: true, message: "Por favor, insira o nome do evento" }]}>
          <Input placeholder="Nome" size="large" />
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true, message: "Por favor, insira a descrição do evento" }]}>
          <TextArea placeholder="Descrição" rows={4} size="large" />
        </Form.Item>

        <Form.Item name="spots" rules={[{ required: true, message: "Por favor, insira a quantidade de lugares" }]}>
          <Input placeholder="Quantidade de lugares disponíveis" type="number" size="large" />
        </Form.Item>

        <Form.Item name="date" rules={[{ required: true, message: "Por favor, selecione a data do evento" }]}>
          <StyledDatePicker
            placeholder="Data do evento"
            format="DD/MM/YYYY"
            size="large"
            suffixIcon={<CalendarIcon size={16} />}
          />
        </Form.Item>

        <ButtonContainer>
          <BackButton onClick={handleCancel}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Voltar
          </BackButton>

          <SaveButton type="primary" onClick={handleSubmit}>
            Salvar evento
            <SaveOutlined style={{ marginLeft: 8 }} />
          </SaveButton>
        </ButtonContainer>
      </Form>
    </StyledModal>
  )
}