<script setup lang="ts">
import { motion } from "motion-v";

/* Fetch all education data */
const { educationItems, status } = useEducationContent();
</script>

<template>
  <div v-if="status === 'pending' || !educationItems" class="flex flex-col gap-8">
    <div v-for="n in 3" :key="n" class="flex gap-2">
      <USkeleton class="size-8 md:size-10 rounded-md" />
      <USkeleton class="w-full h-16" />
    </div>
  </div>

  <div v-else-if="status === 'success'" class="flex flex-col gap-8">
    <motion.div
      v-for="(item, index) in educationItems"
      :key="index"
      :initial="{ opacity: 0, y: 15 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true, amount: 'some' }"
      :transition="{ duration: 0.5 }"
      class="flex gap-2"
    >
      <!-- Company logo -->
      <AboutExperienceCompanyLogo :experience="item" />

      <!-- Single experience -->
      <AboutExperienceDetails
        :experience="{ type: 'education', data: item }"
        display-company
      />
    </motion.div>
  </div>
</template>
