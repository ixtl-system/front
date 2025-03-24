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

export type EventRegistration = {
  id: string;
  userId: string;
  eventId: string;
  status: "CANCELED" | "RESERVED" | "CONFIRMED";
  createdAt: string;
  updatedAt: string;
};
