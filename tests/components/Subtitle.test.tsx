import { render, screen } from "@testing-library/react";
import Subtitle from "src/components/atoms/Subtitle";

describe("Subtitle component", () => {
  it("renders without crashing", () => {
    render(<Subtitle active={true}>Subtitle test</Subtitle>);

    const subTitle = screen.getByTestId("subtitle");
    expect(subTitle).toBeInTheDocument();
  });
});
