import { RedisCacheManager } from "./RedisCacheManager";

export interface GithubMetrics {
  stargazers_count: number;
  forks_count: number;
}

type GithubMetricsCacheEntry = GithubMetrics & {
  cachedAt: string;
};

const GITHUB_METRICS_CACHE_TTL_MINUTES = 15;
const GITHUB_NOT_FOUND_CACHE_TTL_SECONDS = 5 * 60;
const cacheManagers = new Map<string, RedisCacheManager>();

/** Gets cached metrics for a GitHub repository. */
export async function getCachedGithubMetrics(repository: string, connectionUrl: string) {
  return await getCacheManager(connectionUrl)
    .get<GithubMetricsCacheEntry>(getMetricsCacheKey(repository));
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
    .set<GithubMetricsCacheEntry>(getMetricsCacheKey(repository), cachedEntry);
}

/** Returns true if the repository is known to return 404 from GitHub. */
export async function isGithubRepositoryNotFound(repository: string, connectionUrl: string) {
  const value = await getCacheManager(connectionUrl)
    .get<boolean>(getNotFoundCacheKey(repository));
  return value === true;
}

/** Marks a repository as not found (404) in the cache with a shorter TTL. */
export async function storeGithubRepositoryNotFound(repository: string, connectionUrl: string) {
  await getCacheManager(connectionUrl).set<boolean>(
    getNotFoundCacheKey(repository),
    true,
    GITHUB_NOT_FOUND_CACHE_TTL_SECONDS,
  );
}

function getCacheManager(connectionUrl: string) {
  const cacheKey = connectionUrl || "__memory__";
  const existingManager = cacheManagers.get(cacheKey);

  if (existingManager) {
    return existingManager;
  }

  const cacheManager = new RedisCacheManager(
    connectionUrl,
    GITHUB_METRICS_CACHE_TTL_MINUTES * 60,
  );
  cacheManagers.set(cacheKey, cacheManager);

  return cacheManager;
}

function getMetricsCacheKey(repository: string) {
  return `github-metrics:${repository}`;
}

function getNotFoundCacheKey(repository: string) {
  return `github-metrics:not-found:${repository}`;
}
