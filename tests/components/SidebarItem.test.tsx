import { render, screen } from "@testing-library/react";
import SidebarItem from "src/components/molecules/SidebarItem";

describe("SidebarItem component", () => {
  it("renders without crashing", () => {
    render(<SidebarItem label={""}
        route={""}
        pathname={""}
        childs={[]}
        sidebarExpanded={""}
        setSidebarExpanded={()=>{}}/>);

    const sidebar = screen.getByTestId("sidebar-item");
    expect(sidebar).toBeInTheDocument();
  });
});
