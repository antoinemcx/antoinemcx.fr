// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCachedGithubMetrics, storeGithubMetrics } from "../../server/utils/githubMetricsCache";

describe("githubMetricsCache", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useRealTimers();
  });

  it("returns null when cache is empty", async () => {
    // Act
    const result = getCachedGithubMetrics("owner/repo", "");
    // Act & Assert
    await expect(result).resolves.toBeNull();
  });

  it("stores and reads GitHub metrics", async () => {
    // Act
    const stored = await storeGithubMetrics("owner/repo", {
      stargazers_count: 10,
      forks_count: 3,
    }, "");
    const cached = await getCachedGithubMetrics("owner/repo", "");

    // Assert
    expect(stored).toMatchObject({ stargazers_count: 10, forks_count: 3 });
    expect(typeof stored.cachedAt).toBe("string");
    expect(cached).toMatchObject({ stargazers_count: 10, forks_count: 3 });
  });
});
