import { render, screen } from "@testing-library/react";
import SidebarLinkGroup from "src/components/atoms/SidebarLinkGroup";

describe("SidebarLinkGroup component", () => {
  it("renders without crashing", () => {
    render(
      <SidebarLinkGroup activecondition={true}> 
      {(handleClick: Function, open: boolean) => {
        return (<span></span>)
      }
      }</SidebarLinkGroup>
    );

    const formError = screen.getByTestId("sidebar-link-group");
    expect(formError).toBeInTheDocument();
  });
});
