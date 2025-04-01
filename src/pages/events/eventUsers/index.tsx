import { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Button, notification, Spin } from 'antd';
import { FiCheck, FiX } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import { useEvent } from '@/shared/hooks/useEvent';
import { EventUsersContainer } from './styles'

export const EventUsers = () => {
  const params = useParams();
  const { fetchEvent, listEventRegistrations, event, eventRegistrations } = useEvent();

  const event_status = {
    RESERVED: "Reservado",
    CONFIRMED: "Confirmado",
    CANCELED: "Cancelado",
  }

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id);
      listEventRegistrations(params.id);
    }
  }, [])

  function handleReject() {
    notification.success({ message: "Rota não implementada" })
  }

  function handleApprove() {
    notification.success({ message: "Rota não implementada" })
  }

  if (!event) return (
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  )

  return (
    <EventUsersContainer>
      <section className="content">
        <h2>{event.name}</h2>

        <h4>Usuários Registrados</h4>

        <ul>
          {eventRegistrations?.length
            ? eventRegistrations.map(user => (
              <li>
                <span>
                  <b>Usuário:</b> {user.userId}
                  <br />
                  <b>Status:</b> {event_status[user.status]}
                </span>

                <section className="options">
                  <Button className='reject' onClick={handleReject} danger type='primary' disabled={user.status === "CANCELED"}>
                    <FiX />
                  </Button>

                  <Button className='approve' onClick={handleApprove} type='primary' disabled={user.status !== "RESERVED"}>
                    <FiCheck />
                  </Button>
                </section>
              </li>
            ))
            : "Não há registros"
          }
        </ul>
      </section>
    </EventUsersContainer>
  )
}
