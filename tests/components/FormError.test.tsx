import { render, screen } from "@testing-library/react";
import FormError from "src/components/atoms/FormError";

describe("Form error component", () => {
  it("renders without crashing", () => {
    render(<FormError>FormError test</FormError>);

    const formError = screen.getByTestId("form-error");
    expect(formError).toBeInTheDocument();
  });
});
