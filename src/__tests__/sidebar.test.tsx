import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Sidebar from "@/components/shared/Sidebar";
import { UserButton } from "@clerk/nextjs";


vi.mock("@clerk/nextjs", async () => {
  return {
    auth: vi.fn(() => ({
      userId: "123",
    })),
    UserButton: vi.fn(() => <div />),
  };
});

vi.mock("framer-motion", async () => {

  const actual = await vi.importActual("framer-motion");

  return {
    ...actual,
    useMotionValueEvent: vi.fn(),
  }
});

describe("Sidebar testing unlogged", () => {
  test("Sidebar test", () => {
    render(<Sidebar isLogged={false} />);
    const floatingNav = screen.getAllByRole("floating-nav");
    expect(floatingNav).toBeDefined();

    fireEvent.click(within(floatingNav[0]).getByRole("sheet-trigger"))

    const sidebar = screen.getByRole("sidebar");
    expect(sidebar).toBeDefined();

    const sidebarLinks = within(sidebar).getAllByRole("sidebar-link");

    const sidebarHeading = within(sidebar).getByRole("sidebar-heading");
    expect(sidebarHeading).toBeDefined();

    expect(sidebarLinks.length).toEqual(6);

    sidebarLinks.forEach((link) => {
      expect(within(link).getByRole("sidebar-link-icon")).toBeDefined();
      expect(within(link).getByRole("sidebar-link-text")).toBeDefined();
    })
  })
  test("Sidebar 2 test", () => {
    render(<Sidebar isLogged={true} />);
    const floatingNav = screen.getAllByRole("floating-nav");
    expect(floatingNav).toBeDefined();

    fireEvent.click(within(floatingNav[0]).getByRole("sheet-trigger"))

    const sidebar = screen.getByRole("sidebar");
    expect(sidebar).toBeDefined();

    const sidebarLinks = within(sidebar).getAllByRole("sidebar-link");

    const sidebarHeading = within(sidebar).getByRole("sidebar-heading");
    expect(sidebarHeading).toBeDefined();

    expect(sidebarLinks.length).toEqual(6);

    sidebarLinks.forEach((link) => {
      expect(within(link).getByRole("sidebar-link-icon")).toBeDefined();
      expect(within(link).getByRole("sidebar-link-text")).toBeDefined();
    })
  })
})
