<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";

defineProps<{
  experiences?: ExperiencesCollectionItem[]; // already ordered
}>();
</script>

<template>
  <!-- Skeleton loading state if no experience -->
  <div v-if="!experiences || experiences.length === 0" class="flex gap-2">
    <USkeleton class="size-8 md:size-10 rounded-md" />
    <USkeleton class="w-5/6 h-20" />
  </div>

  <Motion
    v-else
    :initial="{ opacity: 0, y: 15 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true }"
    :transition="{ duration: 0.5 }"
    as-child
  >
    <div v-if="experiences.length === 1 && experiences[0]" class="flex gap-2">
      <!-- Company logo -->
      <AboutExperienceCompanyLogo :experience="experiences[0]" />

      <!-- Single experience -->
      <AboutExperienceDetails
        :experience="experiences[0]"
        display-company
      />
    </div>

    <!-- Multiple experiences with a timeline -->
    <div v-else-if="experiences[0]" class="w-full">
      <!-- Company header -->
      <div class="flex gap-2">
        <AboutExperienceCompanyLogo :experience="experiences[0]" />
        <AboutExperienceCompanyHeader :experiences="experiences" class="mb-5" />
      </div>

      <!-- Company experiences list -->
      <div
        v-for="(experience, index) in experiences"
        :key="experience.id"
        class="flex gap-2"
      >
        <!-- Timeline bar -->
        <div class="w-8 md:w-10 flex flex-col items-center">
          <UChip
            color="neutral"
            size="lg"
            standalone inset
            :ui="{ base: 'ring-1 bg-[var(--ui-border-accented)]' }"
            class="pt-0"
          />
          <USeparator v-if="index < experiences.length - 1" orientation="vertical" />
        </div>

        <!-- Experience details -->
        <AboutExperienceDetails
          :experience="experience"
          class="-mt-2"
          :class="{ 'pb-8': index < experiences.length - 1 }"
        />
      </div>
    </div>
  </Motion>
</template>
