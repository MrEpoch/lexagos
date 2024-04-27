import { describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  queryByAttribute,
  queryByRole,
  render,
  screen,
  within,
} from "@testing-library/react";
import Page from "../../app/(course-actions)/actions/page";

vi.mock("@clerk/nextjs", async () => {
  return {
    auth: vi.fn(() => ({
      userId: "123",
    })),
  };
});

vi.mock("@/lib/VerifyAuth", async () => {
  return {
    authCheck: vi.fn(async () => ({ id: "123" })),
  };
});

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
        imageUrl:
          "http://res.cloudinary.com/dwyd6egxk/image/upload/v1712406038/rpqcmwlvkpeqnuf834hl.jpg",
        imageSignature: "45e10f91d57019c9c7338da01c24588a943d60a6",
        publicId: "rpqcmwlvkpeqnuf834hl",
      },
    ]),
    getPageCount: vi.fn(async () => 1),
    createCourse: vi.fn(async () => true),
    updateCourse: vi.fn(async () => true),
  };
});

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

vi.mock("next/headers", async () => {
  const actual = await vi.importActual("next/headers");
  return {
    ...actual,
    headers: vi.fn(() => ({
      get: vi.fn(),
    })),
  };
});

describe("Action page testing", async () => {
  render(await Page({ searchParams: {} }));

  test("Page basic functionality", async () => {
    const pageHeading = screen.getAllByRole("course-action-header");
    expect(pageHeading.length).toEqual(2);

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
    });
  });

  test("Create Modal functionality", async () => {
    const modalAddBtn = screen.getByRole("modal-btn-add");
    expect(modalAddBtn).toBeDefined();
    fireEvent.click(modalAddBtn);

    const dialogWindow = screen.getByRole("dialog-window");
    expect(dialogWindow).toBeDefined();

    const actionForm = within(dialogWindow).getByRole("action-form");
    expect(actionForm).toBeDefined();

    const actionSubmitBtn = within(actionForm).getByRole("button");
    expect(actionSubmitBtn).toBeDefined();

    const inputs = within(actionForm).getAllByRole("action-input-field");

    expect(inputs.length).toEqual(4);

    fireEvent.change(inputs[0], { target: { value: "title-test" } });
    fireEvent.change(inputs[1], { target: { value: "description-test" } });
    fireEvent.change(inputs[2], { target: { value: "99" } });

    expect(inputs[0]).toHaveProperty("value", "title-test");
    expect(inputs[1]).toHaveProperty("value", "description-test");
    expect(inputs[2]).toHaveProperty("value", "99");

    // last input is file for image
    window.URL.createObjectURL = vi.fn();
    vi.mocked(URL.createObjectURL).mockReturnValue(
      "https://picsum.photos/200/300",
    );

    const fileFake = new File(["image-test"], "image-test.png", {
      type: "image/png",
    });
    fireEvent.change(inputs[3], { target: { files: [fileFake] } });

    expect(inputs[3] as HTMLInputElement).toHaveProperty(
      "files[0].name",
      "image-test.png",
    );

    fireEvent.click(actionSubmitBtn);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const inputsRefreshed = within(within(screen.getByRole("dialog-window")).getByRole("action-form")).getAllByRole("action-input-field");

    expect(inputsRefreshed[0]).toHaveProperty("value", "");
    expect(inputsRefreshed[1]).toHaveProperty("value", "");
    expect(inputsRefreshed[2]).toHaveProperty("value", "");

    // close modal

    const closeBtn = screen.getByRole("close-dialog");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog-window")).toBeNull();
  });

  test("Update Modal functionality", async () => {
    const modalUpdateBtn = screen.getByRole("course-action-update");
    expect(modalUpdateBtn).toBeDefined();
    fireEvent.click(modalUpdateBtn);

    const dialogWindow = screen.getByRole("dialog-window");
    expect(dialogWindow).toBeDefined();

    const actionForm = within(dialogWindow).getByRole("action-form");
    expect(actionForm).toBeDefined();

    const actionSubmitBtn = within(actionForm).getByRole("button");
    expect(actionSubmitBtn).toBeDefined();

    expect(
      within(actionForm).getAllByRole("action-input-field").length,
    ).toEqual(4);

    const inputs = within(actionForm).getAllByRole("action-input-field");

    expect(inputs.length).toEqual(4);

    fireEvent.change(inputs[0], { target: { value: "title-test" } });
    fireEvent.change(inputs[1], { target: { value: "description-test" } });
    fireEvent.change(inputs[2], { target: { value: "99" } });

    expect(inputs[0]).toHaveProperty("value", "title-test");
    expect(inputs[1]).toHaveProperty("value", "description-test");
    expect(inputs[2]).toHaveProperty("value", "99");

    // image testing

    window.URL.createObjectURL = vi.fn();
    vi.mocked(URL.createObjectURL).mockReturnValue(
      "https://picsum.photos/200/300",
    );

    const fileFake = new File(["image-test"], "image-test.png", {
      type: "image/png",
    });
    fireEvent.change(inputs[3], { target: { files: [fileFake] } });

    expect(inputs[3] as HTMLInputElement).toHaveProperty(
      "files[0].name",
      "image-test.png",
    );

    // close modal

    const closeBtn = screen.getByRole("close-dialog");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog-window")).toBeNull();
  });
});
