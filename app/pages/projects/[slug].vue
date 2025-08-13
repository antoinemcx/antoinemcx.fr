<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { ProjectsCollectionItem } from "~/types/content";
import { motion } from "motion-v";

const route = useRoute();
const { locale, t } = useI18n();

/* Project path according to locale */
const path = computed(() => `/projects/${locale.value}/${route.params.slug}`);
const collection = computed(() => `projects_${locale.value}` as keyof Collections);

/* Detect where user comes from */
const referrer = ref<string>("");
onMounted(() => {
  if (document.referrer) {
    const referrerUrl = new URL(document.referrer);
    referrer.value = referrerUrl.pathname;
  } else {
    referrer.value = "/projects"; // default
  }
});

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
    class="flex flex-col gap-6"
  >
    <!-- Back Button -->
    <Motion
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.15 }"
      as-child
    >
      <UButton
        color="neutral"
        variant="soft"
        icon="lucide:arrow-left"
        :to="referrer === '/' ? '/' : '/projects'"
        :label="referrer === '/'
          ? t('projects.backHome') : t('projects.backToProjects')"
        class="w-fit mb-10"
        :ui="{ leadingIcon: 'hover:-translate-x-1 transition-transform duration-200' }"
      />
    </Motion>

    <!-- Project header -->
    <Motion
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.25 }"
      as-child
    >
      <ProjectHeader :project="project" size="lg" />
    </Motion>

    <!-- Project content rendering -->
    <motion.div
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.35 }"
    >
      <ContentRenderer :value="project" />
    </motion.div>
  </motion.div>
</template>
