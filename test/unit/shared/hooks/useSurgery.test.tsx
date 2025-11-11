import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SurgeryContext } from "@/shared/context/SurgeryContext";
import { useSurgery } from "@/shared/hooks/useSurgery";

describe("useSurgery", () => {
  it("exposes surgeries context helpers", () => {
    const mockValue = {
      userSurgeries: [{ id: "1", name: "Apendicectomia", userId: "10", surgeryDate: "2023-01-01" }],
      fetchUserSurgeries: vi.fn(),
      createUserSurgery: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <SurgeryContext.Provider value={mockValue}>{children}</SurgeryContext.Provider>
    );

    const { result } = renderHook(() => useSurgery(), { wrapper });

    expect(result.current.userSurgeries).toHaveLength(1);
    expect(result.current.fetchUserSurgeries).toBe(mockValue.fetchUserSurgeries);
    expect(result.current.createUserSurgery).toBe(mockValue.createUserSurgery);
  });
});
