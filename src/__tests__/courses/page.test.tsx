import { expect, test, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Page from "../../app/(main)/courses/page";
import { getCourses, getPageCount } from "@/lib/actions/course.action";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      back: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
      getAll: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

test("Data of courses", async () => {
  const page = 1;
  const searchQuery = "";

  const courses = await getCourses(12, page);
  const pageCount = await getPageCount(12, searchQuery);

  expect(courses).toBeDefined();
  expect(courses).toBeInstanceOf(Array);
  expect(courses?.length).toBeGreaterThan(0);

  expect(pageCount).toBeDefined();
});

test("Page", async () => {
  render(await Page({ searchParams: {} }));

  const courseCard = screen.getAllByRole("course-card");

  expect(courseCard).toBeDefined();

  courseCard.forEach((card) => {
    expect(within(card).getByRole("course-card-title")).toBeDefined();
    expect(within(card).getByRole("course-card-description")).toBeDefined();
    expect(within(card).getByRole("course-card-image")).toBeDefined();
  });
});
