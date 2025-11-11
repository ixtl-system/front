import { describe, expect, it } from "vitest";

import {
  formatEventDateLabel,
  formatEventTimeLabel,
  getEventTimestamp,
} from "@/shared/utils/eventDate";

describe("eventDate utils", () => {
  const isoDate = "2023-08-10T15:30:00.000Z";

  it("formats the event date according to the Brazilian timezone", () => {
    expect(formatEventDateLabel(isoDate)).toBe("10/08/2023");
  });

  it("formats the event time in 24-hour format", () => {
    expect(formatEventTimeLabel(isoDate)).toBe("12:30");
  });

  it("falls back to placeholders when value is invalid", () => {
    expect(formatEventDateLabel("invalid")).toBe("--/--/----");
    expect(formatEventTimeLabel("invalid")).toBe("--:--");
  });

  it("returns the timestamp when date is valid", () => {
    expect(getEventTimestamp(isoDate)).toBe(new Date(isoDate).getTime());
    expect(Number.isNaN(getEventTimestamp("invalid"))).toBe(true);
  });
});
