import type { GithubMetrics } from "../utils/githubMetricsCache";
import {
  getCachedGithubMetrics,
  isGithubRepositoryNotFound,
  storeGithubMetrics,
  storeGithubRepositoryNotFound,
} from "../utils/githubMetricsCache";

/** GET /api/github-metrics?repository=GitHubUsername/repositoryName */
export default defineEventHandler(async (event) => {
  let repository = getQuery(event).repository;
  if (typeof repository !== "string" || repository.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing GitHub repository identifier.",
    });
  }

  repository = repository.trim();
  const { redisUrl } = useRuntimeConfig(event);

  /* Short-circuit if repository was previously not found */
  if (await isGithubRepositoryNotFound(repository, redisUrl)) {
    throw createError({
      statusCode: 404,
      statusMessage: "GitHub repository not found.",
    });
  }

  /* Return from metrics cache if available */
  const cached = await getCachedGithubMetrics(repository, redisUrl);
  if (cached) {
    return cached;
  }

  /* Fetch from GitHub API on cache miss */
  let response: GithubMetrics | null = null;
  try {
    response = await $fetch<GithubMetrics>(`https://api.github.com/repos/${repository}`);
  } catch (err: unknown) {
    if (err && typeof err === "object"
      && "status" in err && err.status === 404) {
      await storeGithubRepositoryNotFound(repository, redisUrl).catch(() => {});
      throw createError({
        statusCode: 404,
        statusMessage: "GitHub repository not found.",
      });
    }
  }

  if (!response) {
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to fetch metrics from GitHub.",
    });
  }

  const metrics: GithubMetrics = {
    stargazers_count: response.stargazers_count,
    forks_count: response.forks_count,
  };

  /* Store in cache for subsequent requests */
  await storeGithubMetrics(repository, metrics, redisUrl).catch(() => {
    // Ignore cache write errors
  });
  return metrics;
});
