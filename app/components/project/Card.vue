<script setup lang="ts">
import type { ProjectsCollectionItem } from "~/types/content";

const props = defineProps<{
  isLargeCard: boolean;
  project: ProjectsCollectionItem;
}>();

const { locale, t } = useI18n();

/* Extract locale code from Nuxt Content path */
const projectPath = props.project.path.replace(`/${locale.value}/`, "/");
</script>

<template>
  <a :href="projectPath" class="active:translate-y-0.5 transition-transform duration-200">
    <UCard
      class="group bg-muted/50 hover:bg-muted dark:bg-muted/25 dark:hover:bg-muted/50
      cursor-pointer hover:ring-accented transition-all duration-500 h-full"
      :ui="{ body: 'h-full flex flex-col' }"
    >
      <ProjectHeader :project="project" class="mb-1" />

      <!-- Description -->
      <p class="text-muted">{{ project.description }}</p>

      <div class="mt-auto">
        <!-- Project data -->
        <ProjectBadges
          :project="project"
          :display-tags-and-technos="isLargeCard"
        />

        <!-- View more button -->
        <div class="w-full flex justify-end items-center">
          <span
            class="opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5
            transition-all duration-500"
          >
            {{ t("readMore") }}
          </span>
          <UIcon
            name="i-lucide-move-right"
            class="size-5 text-muted transition-all duration-500
            group-hover:translate-x-1 group-hover:text-default"
          />
        </div>
      </div>
    </UCard>
  </a>
</template>
