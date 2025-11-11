import { useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { SunHorizon } from "@/assets/icons/SunHorizon";
import { UserContext } from "@/shared/context/UserContext";
import { useEvent } from "@/shared/hooks/useEvent";
import { formatEventDateLabel, formatEventTimeLabel, getEventTimestamp } from "@/shared/utils/eventDate";

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

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = Date.now();
    const mappedEvents =
      events?.map(event => {
        const timestamp = getEventTimestamp(event.date);

        return {
          event,
          timestamp,
          formattedDate: formatEventDateLabel(event.date),
          formattedTime: formatEventTimeLabel(event.date),
        };
      }) ?? [];

    const validEvents = mappedEvents.filter(({ timestamp }) => !Number.isNaN(timestamp));

    const upcoming = validEvents
      .filter(({ timestamp }) => timestamp >= now)
      .sort((a, b) => a.timestamp - b.timestamp);

    const past = validEvents
      .filter(({ timestamp }) => timestamp < now)
      .sort((a, b) => b.timestamp - a.timestamp);

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

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
            {upcomingEvents.map(({ event, formattedDate, formattedTime }) => (
              <button
                key={event.id}
                type="button"
                className="card"
                onClick={() => handleNavigateToEvent(event.id)}
              >
                <div className="card-header">
                  <span className="tag">{formattedDate}</span>

                  <div className="time">
                    <SunHorizon />
                    <span>às {formattedTime}</span>
                  </div>
                </div>

                <h2>{event.name}</h2>

                <p>{`${event.description.slice(0, 335)} ...`}</p>

                <div className="card-footer">
                  <span>{event.availability} vagas disponíveis</span>
                </div>
              </button>
            ))}
          </EventsList>
        </EventsListWrapper>

        {pastEvents.length > 0 && (
          <>
            <EventHeader>
              <div>
                <h1>Eventos Realizados</h1>
                <p>Encontros que já aconteceram</p>
              </div>
            </EventHeader>

            <EventsListWrapper>
              <EventsList>
                {pastEvents.map(({ event, formattedDate, formattedTime }) => (
                  <button
                    key={event.id}
                    type="button"
                    className="card"
                    onClick={() => handleNavigateToEvent(event.id)}
                  >
                    <div className="card-header">
                      <span className="tag">{formattedDate}</span>

                      <div className="time">
                        <SunHorizon />
                        <span>às {formattedTime}</span>
                      </div>
                    </div>

                    <h2>{event.name}</h2>

                    <p>{`${event.description.slice(0, 335)} ...`}</p>

                    <div className="card-footer">
                      <span>{event.availability} vagas disponíveis</span>
                    </div>
                  </button>
                ))}
              </EventsList>
            </EventsListWrapper>
          </>
        )}
      </EventContent>

    </EventsContainer>
  );
};
