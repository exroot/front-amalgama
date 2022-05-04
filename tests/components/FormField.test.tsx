import { render, screen } from "@testing-library/react";
import FormField from "src/components/molecules/FormField";

describe("Form field component", () => {
  it("renders without crashing", () => {
    render(<FormField name="email" type="email" formik={false}/>);

    const formError = screen.getByTestId("form-field");
    expect(formError).toBeInTheDocument();
  });
});
