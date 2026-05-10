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

    vi.stubGlobal("$fetch", vi.fn());
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

  it("fetches from GitHub API on cache miss and stores in cache", async () => {
    // Arrange
    const mockFetch = vi.fn().mockResolvedValue({
      stargazers_count: 50,
      forks_count: 10,
    });
    vi.stubGlobal("$fetch", mockFetch);
    const handler = await loadHandler();

    // Act
    const response = await handler({ query: { repository: "owner/new-repo" } });

    // Assert
    expect(mockFetch).toHaveBeenCalledWith("https://api.github.com/repos/owner/new-repo");
    expect(response).toMatchObject({ stargazers_count: 50, forks_count: 10 });
  });

  it("throws 502 when GitHub API fails", async () => {
    // Arrange
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("$fetch", mockFetch);
    const handler = await loadHandler();

    // Act & Assert
    await expect(handler({ query: { repository: "owner/failing-repo" } })).rejects.toMatchObject({
      statusCode: 502,
      statusMessage: "Failed to fetch metrics from GitHub.",
    });
  });

  it("stores not-found in cache and throws 404 when GitHub returns 404", async () => {
    // Arrange
    const notFoundError = Object.assign(new Error("Not Found"), { status: 404 });
    const mockFetch = vi.fn().mockRejectedValue(notFoundError);
    vi.stubGlobal("$fetch", mockFetch);
    const { isGithubRepositoryNotFound } = await import("../../server/utils/githubMetricsCache");
    const handler = await loadHandler();

    // Act & Assert
    await expect(handler({ query: { repository: "owner/deleted-repo" } })).rejects.toMatchObject({
      statusCode: 404,
      statusMessage: "GitHub repository not found.",
    });
    expect(await isGithubRepositoryNotFound("owner/deleted-repo", "")).toBe(true);
  });

  it("returns 404 without calling GitHub when repository is cached as not found", async () => {
    // Arrange
    const mockFetch = vi.fn();
    vi.stubGlobal("$fetch", mockFetch);
    const { storeGithubRepositoryNotFound } = await import("../../server/utils/githubMetricsCache");
    const handler = await loadHandler();
    await storeGithubRepositoryNotFound("owner/deleted-repo", "");

    // Act & Assert
    await expect(handler({ query: { repository: "owner/deleted-repo" } })).rejects.toMatchObject({
      statusCode: 404,
      statusMessage: "GitHub repository not found.",
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
