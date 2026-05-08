// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("#app/nuxt", async (importOriginal) => {
  const actual = await importOriginal<typeof import("#app/nuxt")>();

  return {
    ...actual,
    useRuntimeConfig: () => ({ redisUrl: "" }),
  };
});

async function loadHandler() {
  const { default: handler } = await import("../../server/api/github-metrics.get");
  return handler;
}

async function loadStore() {
  const { storeGithubMetrics } = await import("../../server/utils/githubMetricsCache");
  return storeGithubMetrics;
}

describe("GET /api/github-metrics", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();

    vi.stubGlobal("defineEventHandler", (handler: unknown) => handler);
    vi.stubGlobal("getQuery", (event: { query?: unknown }) => event.query ?? {});
    vi.stubGlobal("createError", (input: { statusCode: number; statusMessage: string }) => {
      const error = new Error(input.statusMessage) as Error & {
        statusCode: number;
        statusMessage: string;
      };
      error.statusCode = input.statusCode;
      error.statusMessage = input.statusMessage;

      return error;
    });
  });

  it("throws when repository is missing", async () => {
    // Arrange
    const handler = await loadHandler();

    // Act & Assert
    await expect(handler({ query: {} })).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: "Missing GitHub repository identifier.",
    });
  });

  it("returns cached metrics when available", async () => {
    // Arrange
    const storeGithubMetrics = await loadStore();
    const handler = await loadHandler();
    await storeGithubMetrics("owner/repo", {
      stargazers_count: 12,
      forks_count: 4,
    }, "");

    // Act
    const response = await handler({ query: { repository: "owner/repo" } });

    // Assert
    expect(response).toMatchObject({ stargazers_count: 12, forks_count: 4 });
  });
});
