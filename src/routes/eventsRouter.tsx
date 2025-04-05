import { EventList } from "@/pages/events/eventList";
import { EventInfo } from "@/pages/events/eventInfo";

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
