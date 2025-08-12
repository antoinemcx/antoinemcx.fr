<script setup lang="ts">
const props = defineProps<{
  githubRepositoryUrl: string;
}>();

const baseUrl = "https://github.com/";

let repoUrl = props.githubRepositoryUrl.replace(baseUrl, "").split("/");
if (repoUrl.length > 2) {
  repoUrl = repoUrl.slice(0, 2); // remove branches or tags data
}

const { data, status } = await useLazyFetch<{
  stargazers_count: number; // other fields are not useful here
}>(`https://api.github.com/repos/${repoUrl.join("/")}`);

const githubStarCount = data.value?.stargazers_count;
</script>

<template>
  <div v-if="status === 'pending'" class="flex gap-1 items-center">
    <UIcon name="i-lucide-star" class="size-3.5" />
    <USkeleton class="h-5 w-8" />
  </div>

  <div
    v-else-if="status === 'success' && githubStarCount !== undefined"
    class="flex gap-1 items-center"
  >
    <UIcon name="i-lucide-star" class="size-3.5" />
    <span>{{ githubStarCount }}</span>
  </div>
</template>
