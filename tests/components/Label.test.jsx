import { render, screen } from "@testing-library/react";
import Label from "src/components/atoms/Label";

describe("Label component", () => {
  it("renders without crashing", () => {
    render(<Label htmlFor="test">Label test</Label>);

    const label = screen.getByTestId("label", {
      name: /Label test/i,
    });
    expect(label).toBeInTheDocument();
  });
});
