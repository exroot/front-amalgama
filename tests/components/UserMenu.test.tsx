import { render, screen } from "@testing-library/react";
import UserMenu from "src/components/molecules/UserMenu";

describe("UserMenu component", () => {
  it("renders without crashing", () => {
    render(<UserMenu />);

    const usermenu = screen.getByTestId("user-menu");
    expect(usermenu).toBeInTheDocument();
  });
});
