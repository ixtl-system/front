import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { SunHorizon } from "@/assets/icons/SunHorizon";
import { UserContext } from "@/shared/context/UserContext";
import { useEvent } from "@/shared/hooks/useEvent";

import { CreateEventModal } from "../components/CreateEventModal";
import { EventContent, EventHeader, EventsContainer, EventsList } from "./styles";

export const EventList = () => {
  const navigate = useNavigate();
  const { events, fetchEvents, fetchEventTypes } = useEvent();
  const { fetchUserProfile, userProfile } = useContext(UserContext)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleNavigateToEvent = (id: string) => {
    navigate(`/events/${id}`);
  };

  const toggleEventModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchEvents();
    fetchUserProfile();
    fetchEventTypes()
  }, []);

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
            <button onClick={toggleEventModalVisibility}>Criar Evento <FiPlus /></button>
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
