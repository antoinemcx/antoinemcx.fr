<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";
import { motion } from "motion-v";

defineProps<{
  experiences?: ExperiencesCollectionItem[]; // already ordered
}>();
</script>

<template>
  <!-- Skeleton loading state if no experience -->
  <div v-if="!experiences || experiences.length === 0" class="flex gap-2">
    <USkeleton class="size-10 rounded-md" />
    <USkeleton class="w-5/6 h-20" />
  </div>

  <motion.div
    v-else
    :initial="{ opacity: 0, y: 15 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true }"
    :transition="{ duration: 0.5 }" class="flex gap-2"
  >
    <!-- Company logo -->
    <div class="w-fit">
      <NuxtLink :href="experiences[0]!.companyWebsite" target="_blank">
        <NuxtImg
          :src="experiences[0]!.companyLogo"
          :alt="experiences[0]!.company"
          class="rounded-md size-10 max-w-10"
          :class="{ 'cursor-pointer': experiences[0]!.companyWebsite !== undefined }"
        />
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-3 w-full">
      <!-- Company header if multiple experiences -->
      <AboutExperienceCompanyHeader
        v-if="experiences.length > 1"
        :experiences="experiences"
      />

      <!-- Company experiences list -->
      <div class="flex flex-col gap-7">
        <AboutExperienceDetails
          v-for="experience in experiences"
          :key="experience.id"
          :experience="experience"
          :display-company="experiences.length === 1"
        />
      </div>
    </div>
  </motion.div>
</template>
