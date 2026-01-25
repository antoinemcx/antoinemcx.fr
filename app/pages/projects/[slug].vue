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
  throw createError({ status: 404, statusText: t("projects.notFound") });
}

useSeoMeta({
  title: `Antoine M. - ${project.value.title}`,
  description: project.value.description,
});
</script>

<!-- TODO ToC -->
<template>
  <motion.div
    v-if="project"
    :initial="{ y: 30, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.1 }"
    class="flex flex-col gap-3"
  >
    <!-- Back Button -->
    <Motion
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.15 }"
    >
      <UButton
        color="neutral"
        variant="soft"
        icon="lucide:arrow-left"
        :to="referrer === '/' ? '/' : '/projects'"
        :label="referrer === '/'
          ? t('projects.backHome') : t('projects.backToProjects')"
        class="group w-fit active:translate-y-0.5 transition-transform duration-200 mb-10"
        :ui="{
          leadingIcon: 'group-hover:-translate-x-0.5 transition-transform duration-200' }"
      />
    </Motion>

    <!-- TODO faded banner -->

    <!-- Header -->
    <Motion
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.25 }"
      as-child
    >
      <ProjectHeader :project="project" size="lg" />
    </Motion>

    <!-- Links -->
    <Motion
      :initial="{ y: 15, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.3 }"
      as-child
    >
      <ProjectLinks :project="project" />
    </Motion>

    <!-- Badges -->
    <Motion
      :initial="{ y: 15, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.35 }"
      as-child
    >
      <ProjectBadges
        :project="project"
        display-tags-and-technos
        display-labels
      />
    </Motion>

    <motion.p
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.4 }"
      class="mt-10 font-semibold whitespace-pre-line"
    >
      {{ project.description }}
    </motion.p>

    <!-- Content rendering -->
    <motion.div
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.65 }"
      class="my-6"
    >
      <ContentRenderer :value="project" prose />
    </motion.div>
  </motion.div>
</template>
