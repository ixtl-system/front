import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { api } from "@/shared/infra/api";
import { EventContent, EventHeader, EventsContainer, EventsList } from "./styles";
import { UserContext } from "@/shared/context/UserContext";
import { DateTime } from "luxon";
import { SunHorizon } from "@/assets/icons/SunHorizon";
import { CreateEventModal } from "../components/CreateEventModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { fetchUserProfile, userProfile } = useContext(UserContext)
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
    fetchUserProfile()
  }, []);

  const handleNavigateToEvent = (id: string) => {
    navigate(`/events/${id}`);
  };

  const handleNavigateToCreateEvent = () => {
    navigate("/events/create");
  };

  const toggleEventModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <EventsContainer>
      <Helmet title="Eventos" />

      <CreateEventModal visible={isModalVisible} onClose={toggleEventModalVisibility} />

      <EventContent>
        <EventHeader>
          <div>
            <h1>Eventos Disponíveis</h1>
            <p>Cerimônias programadas</p>
          </div>

          {userProfile.role === "ADMIN" && (
            <button onClick={handleNavigateToCreateEvent}>Criar Evento <FiPlus /></button>
          )}
        </EventHeader>

        <EventsList>
          {events?.map(event => (
            <div className="card" onClick={() => handleNavigateToEvent(event.id)}>
              <div className="tag">
                {DateTime.fromISO(event.date).toFormat("dd/MM/yyyy")}
              </div>

              <div className="time">
                <SunHorizon />

                <span>
                  ás {DateTime.fromISO(event.date).toFormat("hh:mm")}
                </span>
              </div>

              <h2>{event.name}</h2>

              <p>{event.description}</p>
            </div>
          ))}
        </EventsList>
      </EventContent>

    </EventsContainer>
  );
};
