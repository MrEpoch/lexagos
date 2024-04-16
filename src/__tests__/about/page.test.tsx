import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Page from "../../app/(main)/about/page";
import { getCourses } from "@/lib/actions/course.action";

test("Data of courses", async () => {
  const courses = await getCourses(16, 1, "");

  expect(courses).toBeDefined();
  expect(courses).toBeInstanceOf(Array);

  if (!courses) return;

  expect(courses.length).toBeGreaterThan(0);
})

test("Page", async () => {
  render(await Page());

  const heroHeading = screen.getByRole("hero-heading-about");

  expect(heroHeading).toBeDefined();

  expect(within(heroHeading).getByRole("hero-heading-h")).toBeDefined();
  expect(within(heroHeading).getByRole("hero-heading-para")).toBeDefined();
  
  const heroParallax = screen.getByRole("hero-parallax");

  expect(heroParallax).toBeDefined();

  const allProducts = within(heroParallax).getAllByRole("hero-parallax-product");

  expect(allProducts).toBeDefined();

  allProducts.forEach((product) => {
    expect(within(product).getByRole("hero-parallax-product-image")).toBeDefined();
    expect(within(product).getByRole("hero-parallax-product-title")).toBeDefined();
  })

  expect(screen.getByRole("about-heading")).toBeDefined();
  expect(screen.getAllByRole("about-image")).toBeDefined();
  expect(screen.getAllByRole("about-paragraph")).toBeDefined();
})
