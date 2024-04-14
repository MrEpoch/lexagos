import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import { section1Home, section2Home, section3Home } from "@/texts/Home";

test("Page", () => {
  render(<Page />);

  // Section 1

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

  // Section 2

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

  // Section 3

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
});
