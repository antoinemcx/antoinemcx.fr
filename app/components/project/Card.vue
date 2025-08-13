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
        <div
          v-if="(isLargeCard && project.tags && project.tags.length > 0)
            || (isLargeCard && project.technologies && project.technologies.length > 0)
            || project.isContributor
            || project.github"
          class="flex flex-col gap-2 mt-4"
        >
          <!-- Contributor badge and Github metrics count -->
          <div
            v-if="project.isContributor || project.github"
            class="flex gap-2 items-center"
          >
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

            <ProjectGithubMetrics
              v-if="project.github"
              :github-repository-url="project.github"
            />
          </div>

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
              class="rounded-full bg-accented/50"
            >
              {{ tag }}
            </UBadge>
          </div>

          <!-- Used technologies for large cards -->
          <div
            v-if="isLargeCard && project.technologies && project.technologies.length > 0"
            class="flex flex-wrap gap-1"
          >
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
