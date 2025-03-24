import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { LoadingOutlined } from '@ant-design/icons';
import { notification, Spin } from 'antd';

import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader"
import { useEvent } from "@/shared/hooks/useEvent"
import { EventData } from "@/shared/types/Event"

import { CreateAndUpdateEventForm } from "../components/CreateAndUpdateEventForm"
import { EventEditContainer } from "./styles"

export const EventEdit = () => {
  const params = useParams();
  const { event, fetchEvent, updateEvent } = useEvent();

  useEffect(() => {
    if (params.id) fetchEvent(params.id);
  }, [])

  async function handleUpdateEvent(data: EventData) {
    const { message } = await updateEvent(String(params.id), data);

    notification.success({ message: message?.title, description: message?.description });
  }


  if (!event) return (
    <LayoutWithHeader>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </LayoutWithHeader>
  )

  return (
    <LayoutWithHeader>
      <EventEditContainer>
        <CreateAndUpdateEventForm title={"Editar Evento"} event={event} onSubmit={handleUpdateEvent} />
      </EventEditContainer>
    </LayoutWithHeader>
  )
}
