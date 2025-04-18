import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { PiCheckCircleFill, PiCircleLight, PiUser, PiXCircleFill } from "react-icons/pi"
import { ArrowLeftOutlined } from "@ant-design/icons"

import { BackButton, FooterContainer, RegisterUsersModalContainer, UserListItem, UsersList } from "./styles"
import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled"
import { useEvent } from "@/shared/hooks/useEvent"
import { Empty, notification } from "antd"

interface RegisterUsersModalProps {
  visible: boolean
  onClose: () => void
}

export const RegisterUsersModal = ({ visible, onClose }: RegisterUsersModalProps) => {
  const params = useParams()
  const { listEventRegistrations, event, eventRegistrations, updateUserRegistration } = useEvent();

  const handleCancel = () => {
    onClose()
  }

  const eventStatus = {
    CANCELED: {
      icon: <PiXCircleFill color="#E46962" />,
      label: "Cancelado"
    },
    CONFIRMED: {
      icon: <PiCheckCircleFill color="#96AE8E" />,
      label: "Confirmado"
    },
    RESERVED: {
      icon: <PiCircleLight color="#7D7C83" />,
      label: "Reservado"
    }
  }

  async function handleApprove(userId: string, eventId: string) {
    const response = await updateUserRegistration({ eventId, userId, status: "CONFIRMED" });

    if (!response.success) return notification.success({ message: "Falha ao confirmar o usuário!" });

    listEventRegistrations(event.id);
    notification.success({ message: "Usuário confirmado com sucesso!" });
  }

  async function handleReject(userId: string, eventId: string) {
    const response = await updateUserRegistration({ eventId, userId, status: "CANCELED" });

    if (!response.success) return notification.success({ message: "Falha ao cancelar o usuário!" });

    listEventRegistrations(event.id);
    notification.success({ message: "Usuário cancelado com sucesso!" });
  }

  useEffect(() => {
    listEventRegistrations(String(params.id))
  }, [])

  return (
    <RegisterUsersModalContainer
      open={visible}
      onCancel={handleCancel}
      width={900}
      height={600}
      footer={null}
    >
      <CustomTitle>Clientes cadastrados no evento</CustomTitle>
      <CustomSubtitle>Lista de clientes para: Cerimônia de Ayahuasca</CustomSubtitle>

      {eventRegistrations?.length ? (
        <UsersList>
          {eventRegistrations.map(user => (
            <UserListItem $status={user.status}>
              <section>
                <h5>
                  <PiUser color="#7D7C83" />

                  {user.userName}
                </h5>

                <div className="status">
                  <span>{eventStatus[user.status].label}</span>

                  {eventStatus[user.status].icon}
                </div>
              </section>

              {user.status === "CONFIRMED" ? (
                <div className="approve-control">
                  <button onClick={() => handleReject(user.userId, user.eventId)} className="reject">
                    Desconfirmar
                  </button>
                </div>
              ) : null}

              {user.status === "RESERVED" ? (
                <div className="approve-control">
                  <button onClick={() => handleApprove(user.userId, user.eventId)} className="approve">
                    Aprovar
                  </button>

                  <button onClick={() => handleReject(user.userId, user.eventId)} className="reject">
                    Reprovar
                  </button>
                </div>
              ) : null}
            </UserListItem>
          ))}
        </UsersList>
      ) : <Empty description="Não há usuários registrados." />
      }


      <FooterContainer>
        <BackButton type="button" onClick={handleCancel}>
          <ArrowLeftOutlined style={{ marginRight: 8 }} />
          Voltar
        </BackButton>
      </FooterContainer>
    </RegisterUsersModalContainer >
  )
}
