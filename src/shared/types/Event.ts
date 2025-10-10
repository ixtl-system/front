export type EventData = {
  name: string;
  description: string;
  availability: number;
  date: string;
}

export type Event = {
  id: string;
  name: string;
  description: string;
  availability: number;
  date: string;
  cover: string;
  userStatus: "OPEN" | "RESERVED" | "CONFIRMED" | "CANCELED";
};

export type EventStatus = "CANCELED" | "RESERVED" | "CONFIRMED";

export type EventRegistration = {
  id: string;
  userId: string;
  eventId: string;
  status: EventStatus;
  userName: string;
  paid: boolean;
  firstTime: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EventType = {
  id: string;
  name: string;
};

