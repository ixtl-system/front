export type EventData = {
  name: string;
  description: string;
  availability: number;
  date: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  availability: number;
  date: string;
  cover: string;
  userStatus: EventStatus | "OPEN";
};

export type EventStatus =
  | "RESERVED"
  | "CONFIRMED"
  | "CANCELED"
  | "CHECKED_IN"
  | "NO_SHOW";

export type EventRegistration = {
  id: string;
  eventId: string;
  userId: string;
  invitedByUserId: string;
  status: EventStatus;
  name: string;
  email: string;
  gender: string;
  firstTimer: boolean;
  hasPaid: boolean;
  checkedInAt: string;
  createdAt: string;
  updatedAt: string;
};

export type EventType = {
  id: string;
  name: string;
};
