import Redis from "ioredis";

interface MemoryCacheEntry<TValue> {
  value: TValue;
  expiresAt: number;
}

/**
 * A cache manager that uses Redis for storage when a connection URL is
 * provided, and falls back to an in-memory cache if unavailable.
 */
export class RedisCacheManager {
  private static redisClient: Redis | null = null;
  private static redisUrl: string | null = null;

  private readonly connectionUrl: string;
  private readonly ttlSeconds: number;
  private readonly memoryCache = new Map<string, MemoryCacheEntry<unknown>>();

  constructor(connectionUrl: string, ttlSeconds: number) {
    this.connectionUrl = connectionUrl;
    this.ttlSeconds = ttlSeconds;
  }

  /** Returns a cached value for the given key, or null if it is missing/expired. */
  public async get<TValue>(key: string): Promise<TValue | null> {
    const client = this.getRedisClient();

    if (client) {
      try {
        const rawEntry = await client.get(key);

        if (rawEntry) {
          return JSON.parse(rawEntry) as TValue;
        }
      } catch {
        // Redis unavailable, continue with in-memory fallback.
      }
    }

    return this.getMemoryValue<TValue>(key);
  }

  /** Stores a value with TTL and returns the stored value. */
  public async set<TValue>(key: string, value: TValue): Promise<TValue> {
    const client = this.getRedisClient();

    if (client) {
      try {
        await client.set(key, JSON.stringify(value), "EX", this.ttlSeconds);
      } catch {
        // Redis unavailable, continue with in-memory fallback.
      }
    }

    this.setMemoryValue(key, value);

    return value;
  }

  private getRedisClient() {
    if (!this.connectionUrl) {
      return null;
    }

    /* Ensure there is a Redis client */
    if (!RedisCacheManager.redisClient
      || RedisCacheManager.redisUrl !== this.connectionUrl) {
      RedisCacheManager.redisClient?.disconnect();
      RedisCacheManager.redisUrl = this.connectionUrl;
      RedisCacheManager.redisClient
        = new Redis(this.connectionUrl, { lazyConnect: true });

      RedisCacheManager.redisClient.on("error", () => {});
    }

    return RedisCacheManager.redisClient;
  }

  private getMemoryValue<TValue>(key: string): TValue | null {
    const cachedEntry = this.memoryCache.get(key);

    if (!cachedEntry || cachedEntry.expiresAt <= Date.now()) {
      this.memoryCache.delete(key);
      return null;
    }

    return cachedEntry.value as TValue;
  }

  private setMemoryValue<TValue>(key: string, value: TValue) {
    this.memoryCache.set(key, {
      value,
      expiresAt: Date.now() + this.ttlSeconds * 1000,
    });
  }
}
