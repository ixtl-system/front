import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import imagem from "@/assets/logo.png";
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { api } from "@/shared/infra/api";
import { EventsContainer } from "./styles";

type Event = {
  id: string;
  eventTypeId: string;
  name: string;
  description: string;
  availability: number;
  date: string;
  cover: string;
};

export const EventList = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    fetchEvents();
  }, []);

  const handleNavigateToEvent = (id: string) => {
    navigate(`/events/register/${id}`);
  };

  return (
    <LayoutWithHeader>
      <EventsContainer>
        <Helmet title="Eventos" />
        <h1>Eventos Disponíveis</h1>
        <div className="events-grid">
          {events?.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleNavigateToEvent(event.id)}
            >
              <img src={imagem} alt={event.name} className="event-image" />
              <div className="event-details">
                <section>
                  <h2 className="event-title">{event.name}</h2>
                  <p className="event-description">{event.description}</p>
                </section>

                <section>
                  <p className="event-date">
                    <strong>Data:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="event-availability">
                    <strong>Vagas Disponíveis:</strong> {event.availability}
                  </p>
                </section>
              </div>
            </div>
          ))}
        </div>
      </EventsContainer>
    </LayoutWithHeader>
  );
};
