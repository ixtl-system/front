const BRAZILIAN_TIME_ZONE = "America/Sao_Paulo";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: BRAZILIAN_TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: BRAZILIAN_TIME_ZONE,
});

const ensureDate = (value: string) => {
  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const formatEventDateLabel = (value: string) => {
  const parsedDate = ensureDate(value);
  return parsedDate ? dateFormatter.format(parsedDate) : "--/--/----";
};

export const formatEventTimeLabel = (value: string) => {
  const parsedDate = ensureDate(value);
  return parsedDate ? timeFormatter.format(parsedDate) : "--:--";
};

export const getEventTimestamp = (value: string) => {
  const parsedDate = ensureDate(value);
  return parsedDate ? parsedDate.getTime() : Number.NaN;
};
