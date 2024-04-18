import { describe, expect, it, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Page from "../app/page";
import { section1Home, section2Home, section3Home, section4Home } from "@/texts/Home";
import user from "@testing-library/user-event";

describe("Page", async () => {
  render(<Page />);

  // Section 1
  it("Should test section 1", () => {
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: section1Home["en"].heading,
      }) ||
        screen.getByRole("heading", {
          level: 1,
          name: section1Home["cz"].heading,
        }),
    ).toBeDefined();
    expect(
      screen.getByText(section1Home["en"].para) ||
        screen.getByText(section1Home["cz"].para),
    ).toBeDefined();
    expect(
      screen.getByText(section1Home["en"].btnStart) ||
        screen.getByText(section1Home["cz"].btnStart),
    ).toBeDefined();
    expect(
      screen.getByText(section1Home["en"].btnMore) ||
        screen.getByText(section1Home["cz"].btnMore),
    ).toBeDefined();

    // Canvas globe rotating container
    
    expect(within(screen.getByRole("globe-rotating"))).toBeDefined();
  })

  // Section 2

  it("Should test section 2", () => {
    expect(
      screen.getByRole("heading", {
        level: 1,
        name:
          section2Home["en"].heading.split1 +
          " " +
          section2Home["en"].heading.split2 +
          " " +
          section2Home["en"].heading.split3,
      }) ||
        screen.getByRole("heading", {
          level: 1,
          name:
            section2Home["cz"].heading.split1 +
            " " +
            section2Home["cz"].heading.split2 +
            " " +
            section2Home["cz"].heading.split3,
        }),
    ).toBeDefined();
  })

  // Section 3

  it("Should test section 3", async () => {
    user.setup();
    expect(
    screen.getByRole("heading", {
      level: 1,
      name:
        section3Home["en"].heading.split1 +
        " " +
        section3Home["en"].heading.split2 +
        " " +
        section3Home["en"].heading.split3,
    }) ||
      screen.getByRole("heading", {
        level: 1,
        name:
          section3Home["cz"].heading.split1 +
          " " +
          section3Home["cz"].heading.split2 +
          " " +
          section3Home["cz"].heading.split3,
      }),
  ).toBeDefined();

  // Paragraph

  expect(screen.getByRole("art-paragraph")).toBeDefined();

  // Image art
  
  expect(screen.getByAltText("Art")).toBeDefined();


  // Video thumbnail

  expect(screen.getByAltText("Modal video thumbnail")).toBeDefined();

  // Video player btn

  const videoPlayerBtn = screen.getByRole("video-player-btn");
  expect(videoPlayerBtn).toBeDefined();

  expect(screen.getByRole("home-video")).toBeDefined();
  })
  // Section 4
  
  it("Should test section 4", () => {
  
  expect(screen.getByRole("heading", { level: 3, name: section4Home["en"].heading }) || screen.getByRole("heading", { level: 3, name: section4Home["cz"].heading })).toBeDefined();


  // Image question mark svg test

  expect(screen.getByAltText("Question mark")).toBeDefined();

  // 3 accordions heading tests
  
  expect (screen.getByText(section4Home["en"].accordion1.heading) || screen.getByText(section4Home["cz"].accordion1.heading)).toBeDefined();
  expect (screen.getByText(section4Home["en"].accordion2.heading) || screen.getByText(section4Home["cz"].accordion2.heading)).toBeDefined();
  expect (screen.getByText(section4Home["en"].accordion3.heading) || screen.getByText(section4Home["cz"].accordion3.heading)).toBeDefined();

  // 3 accordion hidden content test
  
  expect (within(screen.getByRole("accordion1")).getByRole("button") || within(screen.getByRole("accordion2")).getByRole("button") || within(screen.getByRole("accordion3"))).toBeDefined();
  })
});



