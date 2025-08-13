<script setup lang="ts">
import type { UBadge } from "#components";
import type { ProjectsCollectionItem } from "~/types/content";
import { ProjectStatus } from "~/types/content";

const props = defineProps<{
  project: ProjectsCollectionItem;
  size?: "sm" | "lg";
}>();

const { t } = useI18n();

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
  } else if (props.project.status === ProjectStatus.DISCONTINUED) {
    label = t("projects.status.discontinued");
    color = "error";
  }
  return { label, color };
});
</script>

<template>
  <div
    class="flex items-center font-bold"
    :class="size === 'lg' ? 'text-3xl gap-3 text-highlighted' : 'text-lg gap-2'"
  >
    <!-- Logo or placeholder -->
    <NuxtImg
      v-if="project.logo"
      :src="project.logo"
      :alt="project.name"
      class="rounded-full"
      :class="size === 'lg' ? 'size-12' : 'size-6.5'"
    />
    <div
      v-else
      class="rounded-full bg-accented dark:bg-elevated"
      :class="size === 'lg' ? 'size-12' : 'size-6.5'"
    />

    {{ project.name }}

    <!-- Status badge -->
    <UBadge
      v-if="project.status && project.status !== ProjectStatus.ACTIVE"
      :color="status.color"
      variant="soft"
      class="rounded-full"
      :class="{ 'mt-1.5 ml-1': size === 'lg' }"
    >
      {{ status.label }}
    </UBadge>
  </div>
</template>
