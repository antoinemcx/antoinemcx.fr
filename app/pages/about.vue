<script setup lang="ts">
import { HeroCurrentCompany } from "#components";
import { motion } from "motion-v";

const { t } = useI18n();

const isFlagHovered = ref(false);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <!-- Intro -->
      <h1 class="flex gap-1.5 text-2xl font-bold text-highlighted">
        <span class="tracking-[-0.015em] mr-1">{{ t("about.im") }}</span>
        <span class="heading-font mt-0.5">Antoine Marescaux,</span>
        <span class="tracking-[-0.015em] ml-1">{{ t("about.jobTitle") }}</span>
      </h1>

      <p class="text-lg items-center">
        {{ t("about.intro.currentPlace") }}

        <!-- Baguette easter egg -->
        <span
          class="cursor-default"
          @mouseover="isFlagHovered = true"
          @mouseleave="isFlagHovered = false"
        >
          <motion.span
            v-if="isFlagHovered"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.5 }"
          >
            🥖
          </motion.span>

          <motion.span
            v-else
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.5 }"
          >
            🇫🇷
          </motion.span>
        </span>

        {{ t("about.intro.studies") }}
        <HeroCurrentUniversity />
        {{ t("about.intro.educationDepartment") }}
        {{ t("about.intro.company") }}
        <HeroCurrentCompany />
        {{ t("about.intro.work") }}
      </p>
    </div>
  </div>
</template>
