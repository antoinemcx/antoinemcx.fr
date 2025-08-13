<script setup lang="ts">
import type { ProjectsCollectionItem } from "~/types/content";

defineProps<{
  project: ProjectsCollectionItem;
  displayTagsAndTechnos: boolean;
  displayLabels?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <div
    v-if="(displayTagsAndTechnos && project.tags && project.tags.length > 0)
      || (displayTagsAndTechnos
        && project.technologies && project.technologies.length > 0)
      || project.isContributor
      || project.github"
    class="flex flex-col gap-2 mt-4"
  >
    <div
      v-if="project.isContributor || project.github"
      class="flex gap-2 items-center"
    >
      <!-- Contributor badge -->
      <UTooltip
        v-if="project.isContributor"
        :text="t('projects.isContributorTooltip')"
        arrow
        :content="{ sideOffset: 1 }"
      >
        <UBadge color="warning" variant="soft" class="rounded-full">
          {{ t("projects.isContributor") }}
        </UBadge>
      </UTooltip>

      <!-- GitHub metrics count -->
      <ProjectGithubMetrics
        v-if="project.github"
        :github-repository-url="project.github"
      />
    </div>

    <!-- Tags for large cards or project pages -->
    <div
      v-if="displayTagsAndTechnos && project.tags && project.tags.length > 0"
      class="flex items-center gap-2"
    >
      <span v-if="displayLabels" class="text-muted font-semibold">
        {{ t("projects.tags") }}
      </span>

      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          color="neutral"
          variant="soft"
          class="rounded-full bg-accented/50"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <!-- Used technologies for large cards or project pages -->
    <div
      v-if="displayTagsAndTechnos
        && project.technologies && project.technologies.length > 0"
      class="flex items-center gap-2"
    >
      <span v-if="displayLabels" class="text-muted font-semibold">
        {{ t("projects.technologies") }}
      </span>

      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="techno in project.technologies"
          :key="techno"
          color="primary"
          variant="soft"
          class="rounded-full"
        >
          {{ techno }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
