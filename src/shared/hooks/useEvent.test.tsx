import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventProvider } from "@/shared/context/EventContext";
import { useEvent } from "./useEvent";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <EventProvider>{children}</EventProvider>
);

describe("useEvent", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useEvent())).toThrowError(
      /useEvent must be used within an EventProvider/
    );
  });

  it("exposes context value when wrapped", () => {
    const { result } = renderHook(() => useEvent(), { wrapper });

    expect(result.current).toHaveProperty("fetchEvents");
  });
});
