import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Footer from "@/components/shared/Footer";

describe("Footer testing", () => {
  render(<Footer />);
  test("Footer test", () => {
    const footer = screen.getByRole("footer");

    expect(footer).toBeDefined();
    expect(within(footer).getByRole("footer-logo")).toBeDefined();
    expect(within(footer).getByRole("footer-text")).toBeDefined();
    expect(within(footer).getByRole("footer-follow")).toBeDefined();

    const footerSocial = within(footer).getAllByRole("footer-social");
    expect(footerSocial.length).toEqual(3);
  });
});
