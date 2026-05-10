<script setup lang="ts">
import type { GithubMetrics } from "~~/server/utils/githubMetricsCache";

const props = defineProps<{
  githubRepositoryUrl: string;
}>();

const githubBaseUrl = "https://github.com/";
const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000;

const repositoryUrl = computed(() => {
  let repoPath = props.githubRepositoryUrl.replace(githubBaseUrl, "").split("/");
  if (repoPath.length > 2) {
    repoPath = repoPath.slice(0, 2); // remove branches or tags data
  }

  return repoPath.join("/");
});

const { data: metrics, status } = await useLazyFetch<GithubMetrics>("/api/github-metrics", {
  query: { repository: repositoryUrl },
  transform(input) {
    return { ...input, fetchedAt: new Date() };
  },
  /* Client-side caching to avoid requests to server on component remount */
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    if (data?.fetchedAt) {
      const expirationDate = new Date(data.fetchedAt);
      expirationDate.setTime(expirationDate.getTime() + CLIENT_CACHE_TTL_MS);
      if (expirationDate.getTime() < Date.now()) {
        return; // expired, force refetch
      }
      return data;
    }
  },
});

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
