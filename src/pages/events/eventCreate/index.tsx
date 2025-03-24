import { notification } from "antd"
import { useNavigate } from "react-router-dom"

import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader"
import { useEvent } from "@/shared/hooks/useEvent"
import { EventData } from "@/shared/types/Event"

import { CreateAndUpdateEventForm } from "../components/CreateAndUpdateEventForm"
import { EventCreateContainer } from "./styles"

export const EventCreate = () => {
  const { createEvent } = useEvent();
  const navigate = useNavigate();

  async function handleCreateEvent(data: EventData) {
    const { success, message } = await createEvent(data);

    if (!success) return notification.error({ message: message?.title, description: message?.description });

    navigate("/events");
    return notification.success({ message: message?.title, description: message?.description });
  }
  return (
    <LayoutWithHeader>
      <EventCreateContainer>
        <CreateAndUpdateEventForm title={"Criar Evento"} onSubmit={handleCreateEvent} />
      </EventCreateContainer>
    </LayoutWithHeader>
  )
}
