<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";

defineProps<{
  experience: ExperiencesCollectionItem;
}>();
</script>

<template>
  <NuxtLink :href="experience.companyWebsite" target="_blank">
    <NuxtImg
      :src="experience.companyLogo"
      :alt="experience.company"
      class="rounded-md size-8 md:size-10 max-w-8 md:max-w-10"
      :class="{ 'cursor-pointer': experience.companyWebsite !== undefined }"
    />
  </NuxtLink>
</template>
