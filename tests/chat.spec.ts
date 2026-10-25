import { test, expect } from "@playwright/test";
test("chat opens, sends questions, cites sources and restores focus", async ({
  page,
}) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      json: {
        answer: "Nilesh Pawar is a Computer Engineering student.",
        sources: [{ id: "profile", title: "About Nilesh", href: "/#about" }],
      },
    }),
  );
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Ask about Nilesh",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("textbox")).toBeFocused();
  await page.getByRole("textbox").fill("Who is Nilesh?");
  await page.getByRole("button", { name: "Send question" }).click();
  await expect(page.getByRole("log")).toContainText(
    "Computer Engineering student",
  );
  await expect(
    page.getByRole("link", { name: "About Nilesh" }),
  ).toHaveAttribute("href", "/#about");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test("chat fits mobile and shows recoverable provider error", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      status: 503,
      json: { error: "The assistant is temporarily unavailable." },
    }),
  );
  await page.goto("/");
  await page
    .getByRole("button", { name: "Ask about Nilesh", exact: true })
    .click();
  await page.getByRole("button", { name: "How does DocMind work?" }).click();
  await expect(page.getByRole("log")).toContainText("temporarily unavailable");
  await expect(page.getByRole("textbox")).toHaveValue("How does DocMind work?");
  expect(
    await page.getByRole("dialog").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return (
        r.left >= 0 &&
        r.right <= innerWidth &&
        r.top >= 0 &&
        r.bottom <= innerHeight
      );
    }),
  ).toBeTruthy();
});
