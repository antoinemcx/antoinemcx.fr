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
  const { default: handler } = await import("../../server/api/github-metrics.post");
  return handler;
}

describe("POST /api/github-metrics", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();

    vi.stubGlobal("defineEventHandler", (handler: unknown) => handler);
    vi.stubGlobal("readBody", async (event: { body?: unknown }) => event.body ?? {});
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
    await expect(handler({ body: {} })).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: "Missing GitHub repository identifier.",
    });
  });

  it("throws when payload is invalid", async () => {
    // Arrange
    const handler = await loadHandler();

    // Act & Assert
    await expect(handler({
      body: {
        repository: "owner/repo",
        stargazers_count: Number.NaN,
        forks_count: 1,
      },
    })).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: "Invalid GitHub metrics payload.",
    });
  });

  it("stores and returns cache entry", async () => {
    // Arrange
    const handler = await loadHandler();

    // Act
    const response = await handler({
      body: {
        repository: "owner/repo",
        stargazers_count: 22,
        forks_count: 8,
      },
    });

    // Assert
    expect(response).toMatchObject({ stargazers_count: 22, forks_count: 8 });
    expect(typeof response.cachedAt).toBe("string");
  });
});
