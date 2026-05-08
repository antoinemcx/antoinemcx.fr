// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RedisCacheManager } from "../../server/utils/RedisCacheManager";

const redisGetMock = vi.fn();
const redisSetMock = vi.fn();
const redisDisconnectMock = vi.fn();
const redisOnMock = vi.fn();

vi.mock("ioredis", () => {
  class RedisMock {
    get = redisGetMock;
    set = redisSetMock;
    disconnect = redisDisconnectMock;
    on = redisOnMock;

    constructor(_url: string, _options: { lazyConnect: boolean }) {}
  }

  return { default: RedisMock };
});

describe("RedisCacheManager", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useRealTimers();
    redisGetMock.mockReset();
    redisSetMock.mockReset();
    redisDisconnectMock.mockReset();
    redisOnMock.mockReset();
  });

  it("stores and retrieves values with in-memory fallback", async () => {
    // Arrange
    const cacheManager = new RedisCacheManager("", 60);

    // Act
    await cacheManager.set("key", { value: 42 });
    const result = cacheManager.get<{ value: number }>("key");

    // Assert
    await expect(result).resolves.toEqual({ value: 42 });
  });

  it("expires in-memory values after TTL", async () => {
    // Arrange
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    const cacheManager = new RedisCacheManager("", 1);

    // Act
    await cacheManager.set("key", { value: 99 });
    vi.setSystemTime(new Date("2026-01-01T00:00:01.001Z"));
    const result = cacheManager.get<{ value: number }>("key");

    // Assert
    await expect(result).resolves.toBeNull();
  });

  it("uses Redis client when a connection URL is provided", async () => {
    // Arrange
    redisSetMock.mockResolvedValue("OK");
    redisGetMock.mockResolvedValue(JSON.stringify({ value: 7 }));
    const cacheManager = new RedisCacheManager("redis://redis:6379", 300);

    // Act
    await cacheManager.set("github-metrics:owner/repo", { value: 7 });
    const cached = await cacheManager.get<{ value: number }>("github-metrics:owner/repo");

    // Assert
    expect(redisSetMock).toHaveBeenCalledWith(
      "github-metrics:owner/repo",
      JSON.stringify({ value: 7 }),
      "EX",
      300,
    );
    expect(redisGetMock).toHaveBeenCalledWith("github-metrics:owner/repo");
    expect(cached).toEqual({ value: 7 });
  });
});
