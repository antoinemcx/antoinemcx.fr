<script setup lang="ts">
import type { ProjectsCollectionItem } from "~/types/content";
import BadgeLink from "./BadgeLink.vue";

const props = defineProps<{
  project: ProjectsCollectionItem;
}>();

const { t } = useI18n();

const hasLinks = computed(() => props.project.github
  || props.project.website
  || props.project.discord
  || (props.project.otherLinks && props.project.otherLinks.length > 0));
</script>

<template>
  <div v-if="hasLinks" class="flex items-center gap-2">
    <span class="text-muted font-semibold">
      {{ t("projects.links") }}
    </span>

    <div class="flex flex-wrap gap-1">
      <BadgeLink
        v-if="project.github"
        :link="project.github"
        icon="simple-icons:github"
        label="GitHub"
      />
      <BadgeLink
        v-if="project.website"
        :link="project.website"
        icon="lucide:globe"
        :label="t('projects.website')"
      />
      <BadgeLink
        v-if="project.discord"
        :link="project.discord"
        icon="simple-icons:discord"
        label="Discord"
      />

      <!-- Other custom links -->
      <BadgeLink
        v-for="other in project.otherLinks"
        :key="other.link"
        :link="other.link"
        icon="lucide:link"
        :label="other.name"
      />
    </div>
  </div>
</template>
