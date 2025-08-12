<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { ProjectsCollectionItem } from "~/types/content";

const { locale, t } = useI18n();

/* Fetch projects data */
const { data: projects, status }
= await useAsyncData(`projects-${locale.value}`, async () => {
  const collection = (`projects_${locale.value}`) as keyof Collections;
  return await queryCollection(collection)
    .all() as ProjectsCollectionItem[];
}, {
  watch: [locale],
});
</script>

<template>
  <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <UCard v-for="n in 6" :key="n">
      <USkeleton class="h-36" />
    </UCard>
  </div>

  <div v-else-if="!projects || projects.length === 0" class="text-muted">
    {{ t("projects.empty") }}
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      is-large-card
    />
  </div>
</template>
