import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Page from "../../app/(main)/contact/page";
import { sectionContact } from "@/texts/Contact";

test("Page", () => {
  render(<Page />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: sectionContact["en"].header,
    }) || screen.getByRole("heading", {
      level: 1,
      name: sectionContact["cz"].header,
    })
  )

  expect(
    screen.getByText(sectionContact["en"].content1) || screen.getByText(sectionContact["cz"].content1)
  )

  expect(
    screen.getByText(sectionContact["en"].content2) || screen.getByText(sectionContact["cz"].content2)
  )

  expect(
    screen.getByText(sectionContact["en"].btn) || screen.getByText(sectionContact["cz"].btn)
  )


  // Customer support svg
  
  expect(screen.getByRole("customer-support-svg")).toBeDefined()

  // Contact form

  const contactForm = screen.getByRole("contact-form")

  expect(
    contactForm
  ).toBeDefined()

  // Inputs

  expect(
    within(contactForm).getByRole("email") && within(contactForm).getByRole("subject") && within(contactForm).getByRole("message")
  )

  // Labels
  
  expect(
    within(contactForm).getByRole("email-label") && within(contactForm).getByRole("subject-label") && within(contactForm).getByRole("message-label")
  )

  // Contact information table
  
  const contactTable = screen.getByRole("contact-table")

  expect(
    contactTable
  )

  expect(
    within(contactTable).getByRole("contact-table-row-header") 
  )

  expect(
    within(within(contactTable).getByRole("contact-table-row-1")).getByRole("image-item") &&
    within(within(contactTable).getByRole("contact-table-row-2")).getByRole("image-item") &&
    within(within(contactTable).getByRole("contact-table-row-3")).getByRole("image-item") &&
    within(within(contactTable).getByRole("contact-table-row-4")).getByRole("image-item") &&
    within(within(contactTable).getByRole("contact-table-row-5")).getByRole("image-item")
  )


  // Map iframe test
  
  expect(screen.getByRole("mapy-map")).toBeDefined()
})
