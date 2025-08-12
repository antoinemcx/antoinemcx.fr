<script setup lang="ts">
import type { UBadge } from "#components";
import type { ProjectsCollectionItem } from "~/types/content";
import { ProjectStatus } from "~/types/content";

const props = defineProps<{
  isLargeCard: boolean;
  project: ProjectsCollectionItem;
}>();

const { locale, t } = useI18n();

/* Extract locale code from Nuxt Content path */
const projectPath = props.project.path.replace(`/${locale.value}/`, "/");

const status = computed(() => {
  let label = "";
  let color: typeof UBadge["color"] = "";

  if (props.project.status === ProjectStatus.SOON) {
    label = t("projects.status.soon");
    color = "info";
  } else if (props.project.status === ProjectStatus.ACTIVE) {
    label = t("projects.status.active");
    color = "success";
  } else if (props.project.status === ProjectStatus.ARCHIVED) {
    label = t("projects.status.archived");
    color = "error";
  }
  return { label, color };
});
</script>

<template>
  <a :href="projectPath" class="active:translate-y-0.5 transition-transform duration-200">
    <UCard
      class="group cursor-pointer hover:ring-accented transition-all duration-500 h-full"
      :ui="{ body: 'h-full flex flex-col' }"
    >
      <!-- Header -->
      <div class="flex gap-2 items-center text-lg font-bold mb-1">
        <NuxtImg :src="project.logo" :alt="project.name" class="size-7 rounded-full" />
        {{ project.name }}
      </div>

      <!-- Description -->
      <p class="text-muted">
        {{ project.description }}
      </p>

      <div class="flex flex-col gap-2 mt-auto">
        <div
          v-if="(project.status && project.status !== ProjectStatus.ACTIVE)
            || project.github
            || project.isCollaborator"
          class="flex flex-col gap-2 mt-4"
        >
          <!-- GitHub stars and forks count -->
          <ProjectGithubMetrics
            v-if="project.github"
            :github-repository-url="project.github"
          />

          <!-- Status and collaborator badge -->
          <div
            v-if="(project.status && project.status !== ProjectStatus.ACTIVE)
              || project.isCollaborator"
            class="flex gap-1"
          >
            <UBadge
              v-if="project.isCollaborator"
              color="warning"
              variant="soft"
              class="rounded-full"
            >
              {{ t("projects.isCollaborator") }}
            </UBadge>

            <UBadge
              v-if="project.status && project.status !== ProjectStatus.ACTIVE"
              :color="status.color"
              variant="soft"
              class="rounded-full"
            >
              {{ status.label }}
            </UBadge>
          </div>

          <!-- TODO technos -->

          <!-- Tags for large cards -->
          <div
            v-if="isLargeCard && project.tags && project.tags.length > 0"
            class="flex flex-wrap gap-1"
          >
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              color="neutral"
              variant="soft"
              class="rounded-full"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <!-- View more button -->
        <div class="w-full flex justify-end items-center">
          <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {{ t("home.featuredProjects.readMore") }}
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
