<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { ProjectsCollectionItem } from "~/types/content";

const route = useRoute();
const { locale, t } = useI18n();

/* Project path according to locale */
const path = computed(() => `/projects/${locale.value}/${route.params.slug}`);
const collection = computed(() => `projects_${locale.value}` as keyof Collections);

/* Fetch project data */
const { data: project } = await useAsyncData(path.value, async () => {
  return await queryCollection(collection.value)
    .path(path.value)
    .first() as ProjectsCollectionItem;
}, {
  watch: [collection], // to re-fetch when locale changes
});

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: t("projects.notFound") });
}
</script>

<template>
  <div v-if="project">
    <h1 class="text-4xl font-bold text-highlighted mb-5">
      {{ project.title }}
    </h1>

    <ContentRenderer :value="project" />
  </div>
</template>
