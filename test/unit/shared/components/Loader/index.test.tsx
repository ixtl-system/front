import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loader from "@/shared/components/Loader";

describe("Loader", () => {
  it("renders a centered loading spinner", () => {
    const { container } = render(<Loader />);

    expect(container.querySelector(".ant-spin")).toBeTruthy();
    const wrapper = container.querySelector(".ant-flex");
    expect(wrapper).toBeTruthy();
  });
});
