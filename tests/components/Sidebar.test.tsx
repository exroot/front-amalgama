import { render, screen } from "@testing-library/react";
import Sidebar from "src/components/organisms/Sidebar";

describe("Sidebar component", () => {
  it("renders without crashing", () => {
    render(<Sidebar>Sidebar test</Sidebar>);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });
});
