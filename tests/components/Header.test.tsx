import { render, screen } from "@testing-library/react";
import Header from "src/components/organisms/Header";

describe("Header component", () => {
  it("renders without crashing", () => {
    render(<Header>header test</Header>);

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});
