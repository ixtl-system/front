import { EventList } from "@/pages/events/eventList";
import { EventRegister } from "@/pages/events/eventRegister";
import { EventConfig } from "@/pages/events/eventConfig";
import { EventEdit } from "@/pages/events/eventEdit";
import { EventCreate } from "@/pages/events/eventCreate";
import { EventUsers } from "@/pages/events/eventUsers";

export const eventsRouter = [
  {
    path: "events",
    element: <EventList />,
  },
  {
    path: "events/:id",
    element: <EventRegister />,
  },
  {
    path: "events/config/:id",
    element: <EventConfig />,
  },
  {
    path: "events/users/:id",
    element: <EventUsers />,
  },
  {
    path: "events/edit/:id",
    element: <EventEdit />,
  },
  {
    path: "events/create",
    element: <EventCreate />,
  },
];
