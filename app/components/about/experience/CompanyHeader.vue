<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";

const props = defineProps<{
  experiences: ExperiencesCollectionItem[]; // already ordered
}>();

const totalDuration = props.experiences.reduce((total, experience) => {
  if (experience.monthDuration) {
    total += experience.monthDuration;
  }
  return total;
}, 0);
</script>

<template>
  <div class="flex flex-col gap-0.5 md:flex-row md:justify-between">
    <div>
      <a :href="experiences[0]!.companyWebsite" target="_blank">
        <h2
          class="font-semibold hover:text-highlighted transition-colors"
          :class="{ 'cursor-pointer': experiences[0]!.companyWebsite }"
        >
          {{ experiences[0]!.company }}
        </h2>
      </a>
      <p class="text-sm text-muted">
        {{ experiences[0]!.location }}
      </p>
    </div>

    <!-- Sum of experiences duration -->
    <AboutExperienceDuration :month-duration="totalDuration" />
  </div>
</template>
