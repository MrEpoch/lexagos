import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Page from "../../app/(course-actions)/actions/page";

vi.mock("@clerk/nextjs", async () => {
  return {
    auth: vi.fn(() => ({
      userId: "123"
    }))
  }
})

vi.mock("@/lib/VerifyAuth", async () => {
  return {
    authCheck: vi.fn(async () => ({ id: "123" }))
  }
})

vi.mock("@/lib/actions/course.action", async () => {
  return {
    getCourses: vi.fn(async ({}) => [
      {
        id: "0a20edc5-264b-48af-b3a6-ddf1d7fffac9",
        createdAt: new Date("2024-04-06T12:20:39.159Z"),
        updatedAt: new Date("2024-04-06T12:20:39.159Z"),
        name: "test",
        description: "test",
        price: 89,
        courseCreatorId: "97acc09a-d159-41f6-9e3b-4f1f9d4cfcbc",
        imageUrl: "http://res.cloudinary.com/dwyd6egxk/image/upload/v1712406038/rpqcmwlvkpeqnuf834hl.jpg",
        imageSignature: "45e10f91d57019c9c7338da01c24588a943d60a6",
        publicId: "rpqcmwlvkpeqnuf834hl"
      }
    ]),
    getPageCount: vi.fn(async () => 1),
  }
})

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
  }
})

vi.mock("next/headers", async () => {
  const actual = await vi.importActual("next/headers");
  return {
    ...actual,
    headers: vi.fn(() => ({
      get: vi.fn()
    }))
  }
})

test("Page", async () => {
  render(await Page({ searchParams: {} }));

  const pageHeading = screen.getAllByRole("course-action-header");
  expect(pageHeading.length).toEqual(2);

  const modalAddBtn = screen.getByRole("modal-btn-add");
  expect(modalAddBtn).toBeDefined();

  const cardItem = screen.getByRole("course-card");
  expect(cardItem).toBeDefined();

  const deleteBtn = within(cardItem).getByRole("course-action-delete");
  const updateBtn = within(cardItem).getByRole("course-action-update");

  expect(deleteBtn).toBeDefined();
  expect(updateBtn).toBeDefined();

  const userActionForm = screen.getAllByRole("user-action-form");
  expect(userActionForm.length).toEqual(2);
  userActionForm.forEach((form) => {
    expect(within(form).getByRole("button")).toBeDefined();
    expect(within(form).getByRole("input-form")).toBeDefined();
    expect(within(form).getByRole("input-label")).toBeDefined();
    expect(within(form).getByRole("input-desc")).toBeDefined();
  })

  fireEvent.click(modalAddBtn);
  expect(screen.getByRole("dialog-window")).toBeDefined();
})
