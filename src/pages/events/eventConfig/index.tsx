import { useNavigate, useParams } from 'react-router-dom'

import { EventConfigContainer } from './styles'

export const EventConfig = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <EventConfigContainer>
      <section className="content">

        <h2>Configurações do Evento</h2>
        <ul>
          <li>
            <button onClick={() => navigate(`/events/edit/${params.id}`)}>
              Editar Evento
            </button>
          </li>

          <li>
            <button onClick={() => navigate(`/events/users/${params.id}`)}>
              Usuários Registrados
            </button>
          </li>
        </ul>

      </section>
    </EventConfigContainer>
  )
}
