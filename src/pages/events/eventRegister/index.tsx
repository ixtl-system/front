import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FiCalendar, FiUsers } from "react-icons/fi";
import { DateTime } from "luxon";

import image from "@/assets/logo.png";
import { api } from "@/shared/infra/api";
import { Modal } from "@/shared/components/modal";
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { UserContext } from "@/shared/context/UserContext";

import { EventRegisterContainer } from "./styles";

type Event = {
  id: string;
  name: string;
  description: string;
  availability: number;
  date: string;
  cover: string;
};

export const EventRegister = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchUserProfile } = useContext(UserContext);

  const [event, setEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error: any) {
        setModalTitle("Evento não encontrado");
        setModalMessage(error.response.data.message);
        setIsModalOpen(true);
        console.error("Error fetching event details:", error);
      }
    }

    if (id) {
      fetchEventDetails();
      fetchUserProfile();
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await api.post("/events/register", { eventId: id });
      if (response.status === 201) {
        setModalTitle("Vc se registrou ");
        setModalMessage("Registrado no evento");
        setIsModalOpen(true);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        console.log("error.response.data: ", error.response.data.message);
        setModalTitle("Perfil incompleto");
        setModalMessage(error.response.data.message);
        setIsModalOpen(true);
      } else if (error.response?.status === 409) {
        console.log("error.response.data: ", error.response.data.message);
        setModalTitle("Vc já se registrou ");
        setModalMessage(error.response.data.message);
        setIsModalOpen(true);
      } else {
        console.error("Unexpected error during registration:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LayoutWithHeader>
      <EventRegisterContainer>
        <Helmet title="Register" />

        {event ? (
          <>
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

                <button className="settings-button">
                  Configurar
                </button>
                <button onClick={handleRegister} className="register-button">
                  Registrar-se no Evento
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

              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalTitle}
                message={modalMessage}
              />
            </div>
          </>
        ) : (
          <div>
            <p>Carregando informações do evento...</p>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={modalTitle}
              message={modalMessage}
            />
          </div>
        )}
      </EventRegisterContainer>
    </LayoutWithHeader >
  );
};
