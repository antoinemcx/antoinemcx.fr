import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import App from "~/app.vue";

describe("nuxt environment", () => {
  it("should run tests", () => {
    expect(true).toBe(true);
  });

  it("can mount an application", async () => {
    const component = await mountSuspended(App, { route: "/" });
    expect(component.html().length).toBeGreaterThan(0);
  });
});
