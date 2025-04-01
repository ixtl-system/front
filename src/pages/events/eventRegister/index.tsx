import { useNavigate, useParams } from "react-router-dom";
import { FiCalendar, FiUsers } from "react-icons/fi";
import { LoadingOutlined } from '@ant-design/icons';
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { notification, Spin } from "antd";
import { DateTime } from "luxon";

import image from "@/assets/logo.png";
import { useEvent } from "@/shared/hooks/useEvent";
import { UserContext } from "@/shared/context/UserContext";

import { EventRegisterContainer } from "./styles";

export const EventRegister = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchUserProfile, userProfile } = useContext(UserContext);
  const { event, fetchEvent, registerUserInEvent } = useEvent();
  const navigate = useNavigate();

  const event_status = {
    OPEN: "Registrar-se no Evento",
    RESERVED: "Reservado",
    CONFIRMED: "Confirmado",
    CANCELED: "Solicitado",
  }

  useEffect(() => {
    async function fetchEventDetails(id: string) {
      const { success, message } = await fetchEvent(id)
      if (!success) notification.error({ message: message?.title, description: message?.description });
    }

    if (id) {
      fetchEventDetails(id);
      fetchUserProfile();
    }
  }, []);

  const handleRegister = async () => {
    const { success, message } = await registerUserInEvent(String(id));

    if (success) return notification.success({ message: message?.title, description: message?.description })
    return notification.error({ message: message?.title, description: message?.description })
  };

  const handleNavigateToConfig = () => {
    navigate(`/events/config/${id}`);
  };

  if (!event) return (
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  )

  return (
    <EventRegisterContainer>
      <Helmet title="Register" />

      <div className="event-cover">
        <section className="event-info">
          <h2>{event.name}</h2>

          <h4>
            <FiCalendar />
            {DateTime.fromISO(event.date).toFormat("dd MMM yyyy - hh:mm")}
          </h4>

          <h4>
            <FiUsers />
            Vagas disponíveis: {event.availability}
          </h4>

          {userProfile.role === "ADMIN" && (
            <button className="settings-button" onClick={handleNavigateToConfig}>
              Configurar
            </button>
          )}
          <button onClick={handleRegister} className="register-button" disabled={event.userStatus !== "OPEN"}>
            {event_status[event.userStatus]}
          </button>
        </section>

        <img src={image} alt={event.name} className="event-preview-image" />
      </div>

      <div className="event-details">
        <h3>Descrição do Evento</h3>
        <p className="event-description">{event.description}</p>

        <h3>Conduta</h3>
        <p>
          O respeito e a boa convivência são fundamentais. Todos devem agir com cordialidade, ouvindo e interagindo de forma harmoniosa. Valorizar o momento e manter uma energia positiva contribui para uma experiência mais enriquecedora para todos.
        </p>

        <h3>O que pode fazer</h3>
        <p>
          Você pode interagir, compartilhar histórias e vivenciar a experiência de forma aberta e respeitosa. Aproveite o momento para se conectar com as pessoas ao seu redor, sempre mantendo uma postura amigável e receptiva.
        </p>

        <h3>O que não pode fazer</h3>
        <p>
          Evite qualquer comportamento que possa desrespeitar os demais participantes ou prejudicar a experiência coletiva. O uso de linguagem ofensiva, atitudes desrespeitosas ou qualquer conduta que vá contra o espírito do evento não serão aceitos.
        </p>
      </div>
    </EventRegisterContainer>
  );
};
