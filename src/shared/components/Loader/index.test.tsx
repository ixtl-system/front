import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loader from ".";
import { renderWithProviders } from "@/tests/test-utils";

describe("Loader", () => {
  it("renders Ant Design spinner", () => {
    renderWithProviders(<Loader />);

    const spin = screen.getByRole("status");
    expect(spin).toBeInTheDocument();
  });
});
