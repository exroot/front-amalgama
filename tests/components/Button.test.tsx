import { render, screen } from "@testing-library/react";
import Button from "src/components/atoms/Button";

describe("Button component", () => {
  it("renders without crashing", () => {
    render(<Button>Button test</Button>);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });
});
