import { RedisCacheManager } from "./RedisCacheManager";

export interface GithubMetrics {
  stargazers_count: number;
  forks_count: number;
}

type GithubMetricsCacheEntry = GithubMetrics & {
  cachedAt: string;
};

const GITHUB_METRICS_CACHE_TTL_SECONDS = 60 * 10;
const cacheManagers = new Map<string, RedisCacheManager>();

/** Gets cached metrics for a GitHub repository. */
export async function getCachedGithubMetrics(repository: string, connectionUrl: string) {
  return await getCacheManager(connectionUrl)
    .get<GithubMetricsCacheEntry>(getCacheKey(repository));
}

/** Stores metrics for a GitHub repository in the cache (Redis or in-memory). */
export async function storeGithubMetrics(
  repository: string,
  metrics: GithubMetrics,
  connectionUrl: string,
) {
  const cachedEntry: GithubMetricsCacheEntry = {
    ...metrics,
    cachedAt: new Date().toISOString(),
  };

  return await getCacheManager(connectionUrl)
    .set<GithubMetricsCacheEntry>(getCacheKey(repository), cachedEntry);
}

function getCacheManager(connectionUrl: string) {
  const cacheKey = connectionUrl || "__memory__";
  const existingManager = cacheManagers.get(cacheKey);

  if (existingManager) {
    return existingManager;
  }

  const cacheManager = new RedisCacheManager(
    connectionUrl,
    GITHUB_METRICS_CACHE_TTL_SECONDS,
  );
  cacheManagers.set(cacheKey, cacheManager);

  return cacheManager;
}

function getCacheKey(repository: string) {
  return `github-metrics:${repository}`;
}
