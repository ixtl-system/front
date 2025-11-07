import { render, screen } from "@testing-library/react";

import Loader from "./index";

describe("Loader", () => {
  it("renders the Ant Design spinner", () => {
    render(<Loader />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
