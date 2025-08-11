<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { ProjectsCollectionItem } from "~/types/content";

const { locale, t } = useI18n();

/* Fetch featured projects data */
const { data: featuredProjects }
= await useAsyncData(`projects-${locale.value}`, async () => {
  const collection = (`projects_${locale.value}`) as keyof Collections;
  return await queryCollection(collection)
    .where("isFeatured", "=", true)
    .all() as ProjectsCollectionItem[];
}, {
  watch: [locale],
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <div>
      <h1 class="text-2xl text-highlighted font-bold">
        {{ t("home.featuredProjects.title") }}
      </h1>
      <p class="text-muted">
        {{ t("home.featuredProjects.description") }}
      </p>
    </div>

    <div v-if="!featuredProjects || featuredProjects.length === 0" class="text-muted">
      {{ t("home.featuredProjects.empty") }}
    </div>

    <div v-else class="flex flex-col gap-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
          :is-large-card="false"
        />
      </div>

      <UButton
        color="neutral"
        variant="outline"
        trailing-icon="i-lucide-arrow-right"
        class="group w-fit"
        :ui="{
          trailingIcon: 'group-hover:translate-x-0.5 transition-transform duration-200',
        }"
        to="/projects"
      >
        {{ t("home.featuredProjects.viewAll") }}
      </UButton>
    </div>
  </div>
</template>
