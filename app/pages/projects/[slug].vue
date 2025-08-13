<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { ProjectsCollectionItem } from "~/types/content";
import { motion } from "motion-v";

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
  <motion.div
    v-if="project"
    :initial="{ y: 30, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.1 }"
    class="flex flex-col gap-4"
  >
    <Motion
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.25 }"
      as-child
      class="mb-4"
    >
      <ProjectHeader :project="project" size="lg" />
    </Motion>

    <motion.div
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.3 }"
    >
      <ContentRenderer :value="project" />
    </motion.div>
  </motion.div>
</template>
