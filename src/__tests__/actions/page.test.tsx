import { expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
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
})
