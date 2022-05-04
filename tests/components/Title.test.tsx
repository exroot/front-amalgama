import { render, screen } from "@testing-library/react";
import Title from "src/components/atoms/Title";

describe("Title component", () => {
  it("renders without crashing", () => {
    render(<Title active={true}>Title test</Title>);

    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});
