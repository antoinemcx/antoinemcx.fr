<script setup lang="ts">
import type { ProjectsCollectionItem } from "~/types/content";

defineProps<{ project: ProjectsCollectionItem }>();

const { locale } = useI18n();

/** Extract locale code from Nuxt Content path */
function getProjectPath(project: ProjectsCollectionItem): string {
  return project.path.replace(`/${locale.value}/`, "/");
}
</script>

<template>
  <div class="p-4 border border-default rounded-lg">
    <h2 class="text-lg font-bold">
      {{ project.name }}
    </h2>

    <p class="text-muted">
      {{ project.description }}
    </p>
    <UButton :to="getProjectPath(project)" variant="subtle">
      {{ getProjectPath(project) }}
    </UButton>
  </div>
</template>
