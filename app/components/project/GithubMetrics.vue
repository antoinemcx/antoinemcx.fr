<script setup lang="ts">
const props = defineProps<{
  githubRepositoryUrl: string;
}>();

const nuxtApp = useNuxtApp();
const baseUrl = "https://github.com/";

let repoUrl = props.githubRepositoryUrl.replace(baseUrl, "").split("/");
if (repoUrl.length > 2) {
  repoUrl = repoUrl.slice(0, 2); // remove branches or tags data
}

const { data, status } = await useLazyFetch<{
  stargazers_count: number;
  forks_count: number; // other fields are not useful here
}>(`https://api.github.com/repos/${repoUrl.join("/")}`, {
  transform(input) {
    return { ...input, fetchedAt: new Date() };
  },
  getCachedData(key) { // check cache, refetch if nullish value
    let data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

    /* Check for data expiration */
    if (data) {
      const expirationDate = new Date(data.fetchedAt);
      expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 5); // 5 min
      if (expirationDate.getTime() < Date.now()) {
        data = null; // data expired, null to force refetch
      }
    }

    return data;
  },
});

const githubStarCount = computed(() => data.value?.stargazers_count);
const githubForkCount = computed(() => data.value?.forks_count);
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
