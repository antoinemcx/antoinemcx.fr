import { getCachedGithubMetrics } from "../utils/githubMetricsCache";

/** GET /api/github-metrics?repository=GitHubUsername/repositoryName */
export default defineEventHandler(async (event) => {
  const repository = getQuery(event).repository;

  if (typeof repository !== "string" || repository.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing GitHub repository identifier.",
    });
  }

  const { redisUrl } = useRuntimeConfig(event);
  return await getCachedGithubMetrics(repository.trim(), redisUrl);
});
