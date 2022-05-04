import { render, screen } from "@testing-library/react";
import FormGroup from "src/components/molecules/FormGroup";

describe("Form group component", () => {
  it("renders without crashing", () => {
    render(<FormGroup>form group test</FormGroup>);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();
  });
});
