import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { SunHorizon } from "@/assets/icons/SunHorizon";
import { UserContext } from "@/shared/context/UserContext";
import { useEvent } from "@/shared/hooks/useEvent";

import { CreateEventModal } from "../components/CreateEventModal";
import {
  EventContent,
  EventHeader,
  EventHero,
  EventsContainer,
  EventsList,
  EventsListWrapper,
} from "./styles";

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
        <EventHero>
          <span>Cerimônias em andamento</span>
          <h1>Calendário vivo de rituais e vivências</h1>
          <p>
            Acompanhe, crie e gerencie encontros com clareza. Uma visão acolhedora para organizar jornadas de cura
            diariamente.
          </p>
        </EventHero>

        <EventHeader>
          <div>
            <h1>Eventos Disponíveis</h1>
            <p>Cerimônias programadas</p>
          </div>

          {userProfile.role === "ADMIN" && (
            <button onClick={toggleEventModalVisibility}>Criar Evento <FiPlus /></button>
          )}
        </EventHeader>

        <EventsListWrapper>
          <EventsList>
            {events?.map(event => (
              <button
                key={event.id}
                type="button"
                className="card"
                onClick={() => handleNavigateToEvent(event.id)}
              >
                <div className="card-header">
                  <span className="tag">{DateTime.fromISO(event.date).toFormat("dd/MM/yyyy")}</span>

                  <div className="time">
                    <SunHorizon />
                    <span>às {DateTime.fromISO(event.date).toFormat("HH:mm")}</span>
                  </div>
                </div>

                <h2>{event.name}</h2>

                <p>{event.description}</p>

                <div className="card-footer">
                  <span>{event.availability} vagas disponíveis</span>
                </div>
              </button>
            ))}
          </EventsList>
        </EventsListWrapper>
      </EventContent>

    </EventsContainer>
  );
};
