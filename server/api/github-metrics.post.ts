import type { GithubMetrics } from "../utils/githubMetricsCache";
import { storeGithubMetrics } from "../utils/githubMetricsCache";

export interface GithubMetricsRequest {
  repository?: string;
  stargazers_count?: number;
  forks_count?: number;
}

/**
 * POST /api/github-metrics
 * Body: { repository: string, stargazers_count: number, forks_count: number }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<GithubMetricsRequest>(event);
  const repository = body.repository?.trim();

  if (!repository) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing GitHub repository identifier.",
    });
  }
  if (!Number.isFinite(body.stargazers_count) || !Number.isFinite(body.forks_count)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid GitHub metrics payload.",
    });
  }

  const { redisUrl } = useRuntimeConfig(event);
  const metrics: GithubMetrics | undefined
    = body.stargazers_count !== undefined && body.forks_count !== undefined
      ? {
          stargazers_count: body.stargazers_count,
          forks_count: body.forks_count,
        }
      : undefined;

  return metrics ? await storeGithubMetrics(repository, metrics, redisUrl) : null;
});
