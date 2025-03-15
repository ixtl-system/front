import { EventList } from "@/pages/events/eventList";
import { EventRegister } from "@/pages/events/eventRegister";

export const eventsRouter = [
  {
    path: "events",
    element: <EventList />,
  },
  {
    path: "events/register/:id",
    element: <EventRegister />,
  },
];
