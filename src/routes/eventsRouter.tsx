import { EventInfo } from "@/pages/events/eventInfo";
import { EventList } from "@/pages/events/eventList";

export const eventsRouter = [
  {
    path: "events",
    element: <EventList />,
  },
  {
    path: "events/:id",
    element: <EventInfo />,
  },
];
