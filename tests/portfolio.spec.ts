import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/projects/",
  "/projects/investify/",
  "/projects/ai-blog-generator/",
  "/projects/docmind/",
  "/projects/hms-portal/",
  "/projects/resolvedesk/",
];
for (const width of [360, 768, 1280, 1920]) {
  test(`pages fit ${width}px without runtime errors`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
test("role lenses change project order and downloadable resume", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "AI engineering", exact: true })
    .click();
  await expect(page.locator(".project-row h3").first()).toHaveText("DocMind");
  await expect(page.locator("h1")).toContainText("Useful AI.");
  const ai = await page
    .locator(".hero-actions a[download]")
    .getAttribute("href");
  await page
    .getByRole("button", { name: "Generative AI", exact: true })
    .click();
  await expect(page.locator(".hero-actions a[download]")).toHaveAttribute(
    "href",
    ai!,
  );
  await page.getByRole("button", { name: "Software", exact: true }).click();
  await expect(page.locator(".project-row h3").first()).toHaveText("Investify");
  const pdf = await request.get(
    (await page.locator(".hero-actions a[download]").getAttribute("href"))!,
  );
  expect(pdf.headers()["content-type"]).toBe("application/pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
});
test("theme survives reload, mobile navigation and keyboard entry work", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByText("Skip to content", { exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByLabel("Open navigation").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByText("About", { exact: true })
    .click();
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await page.locator('img[src="/profile.webp"]').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('img[src="/profile.webp"]')
        .evaluate((el: HTMLImageElement) => el.naturalWidth),
    )
    .toBeGreaterThan(0);
});
test("static content, headers, redirects and missing pages", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator(".project-row")).toHaveCount(5);
  await context.close();
  const home = await request.get("/");
  expect(home.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  for (const route of ["about", "skills", "achievements", "contact"]) {
    const response = await request.get("/" + route, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toContain("/#");
  }
  expect((await request.get("/missing-page/")).status()).toBe(404);
});
