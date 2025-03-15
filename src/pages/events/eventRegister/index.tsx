import "./styles.css";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import image from "@/assets/logo.png";
import { Modal } from "@/shared/components/modal";
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { api } from "@/shared/infra/api";

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
    }
  }, [id]);

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
      <div className="event-register-container">
        <Helmet title="Register" />
        {event ? (
          <>
            <div className="event-cover">
              <img src={image} alt={event.name} className="event-cover-image" />
            </div>
            <div className="event-details">
              <h1>{event.name}</h1>
              <p className="event-description">{event.description}</p>

              <div className="event-conduct">
                <h3>Conduta</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="event-dos">
                <h3>O que pode fazer</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam.
                </p>
              </div>

              <div className="event-donts">
                <h3>O que não pode fazer</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  nisi. Nulla quis sem at nibh elementum imperdiet. Duis
                  sagittis ipsum.
                </p>
              </div>

              <button onClick={handleRegister} className="register-button">
                Registrar-se no Evento
              </button>
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
      </div>
    </LayoutWithHeader>
  );
};
