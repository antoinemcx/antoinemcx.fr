<script setup lang="ts">
import type { AsyncDataRequestStatus } from "#app";
import type { GithubMetricsRequest } from "~~/server/api/github-metrics.post";
import type { GithubMetrics } from "~~/server/utils/githubMetricsCache";

const props = defineProps<{
  githubRepositoryUrl: string;
}>();

const githubBaseUrl = "https://github.com/";
const cacheEndpoint = "/api/github-metrics";

const repositoryUrl = computed(() => {
  let repoPath = props.githubRepositoryUrl.replace(githubBaseUrl, "").split("/");
  if (repoPath.length > 2) {
    repoPath = repoPath.slice(0, 2); // remove branches or tags data
  }

  return repoPath.join("/");
});

const metrics = ref<GithubMetrics | null>(null);
const status = ref<AsyncDataRequestStatus>("idle");

async function loadGithubMetrics() {
  const repository = repositoryUrl.value;
  status.value = "pending";
  metrics.value = null;

  if (!repository) {
    status.value = "error";
  } else { // check server cache first, then fetch from GitHub if cache miss
    const cachedMetrics = await getCachedMetrics(repository);

    if (cachedMetrics) {
      metrics.value = cachedMetrics;
      status.value = "success";
    } else { // fetch from GitHub API
      try {
        const githubMetrics = await $fetch<GithubMetrics>(
          `https://api.github.com/repos/${repository}`,
        );
        metrics.value = githubMetrics;
        status.value = "success";

        /* Update server cache with new metrics */
        updateCachedMetrics(repository, githubMetrics);
      } catch {
        status.value = "error";
      }
    }
  }
}

async function getCachedMetrics(repository: string) {
  try {
    return await $fetch<GithubMetrics | null>(cacheEndpoint, {
      query: { repository },
    });
  } catch {
    // Ignore cache errors to fetch from GitHub
  }
  return null;
}

function updateCachedMetrics(repository: string, metrics: GithubMetrics) {
  const request: GithubMetricsRequest = {
    repository,
    stargazers_count: metrics.stargazers_count,
    forks_count: metrics.forks_count,
  };
  $fetch(cacheEndpoint, { method: "POST", body: request }).catch(() => {
    // Ignore cache update errors
  });
}

watch(repositoryUrl, loadGithubMetrics, { immediate: true });

const githubStarCount = computed(() => metrics.value?.stargazers_count);
const githubForkCount = computed(() => metrics.value?.forks_count);
</script>

<template>
  <div v-if="status === 'pending'" class="flex gap-2 items-center">
    <div class="flex gap-1 items-center">
      <UIcon name="lucide:star" class="size-3.5" />
      <USkeleton class="h-5 w-6" />
    </div>
    <div class="flex gap-1 items-center">
      <UIcon name="lucide:git-fork" class="size-3.5" />
      <USkeleton class="h-5 w-6" />
    </div>
  </div>

  <!-- Show metrics if no error -->
  <div
    v-else-if="status === 'success' && githubStarCount !== undefined"
    class="flex gap-1 items-center"
  >
    <UIcon name="lucide:star" class="size-3.5" />
    <span>{{ githubStarCount }}</span>
  </div>

  <div
    v-if="status === 'success' && githubForkCount !== undefined"
    class="flex gap-1 items-center"
  >
    <UIcon name="lucide:git-fork" class="size-3.5" />
    <span>{{ githubForkCount }}</span>
  </div>
</template>
