<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-12 md:gap-14 lg:gap-24">
    <!-- Intro -->
    <div class="flex flex-col gap-3">
      <motion.h1
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
        class="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-2xl font-bold text-highlighted"
      >
        <span class="tracking-[-0.015em] mr-1">{{ t("about.im") }}</span>
        <span class="heading-font mt-0.5">Antoine Marescaux,</span>
        <span class="tracking-[-0.015em] ml-1">{{ t("about.jobTitle") }}</span>
      </motion.h1>

      <Motion
        :initial="{ y: 15, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.55, ease: 'easeOut', delay: 0.45 }"
        as-child
      >
        <AboutIntroduction />
      </Motion>
    </div>

    <!-- Skills -->
    <div class="flex flex-col gap-4 mb-1">
      <motion.h1
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.7 }"
        class="text-2xl font-bold text-highlighted"
      >
        {{ t("about.mostUsedTechnologies") }}
      </motion.h1>

      <Motion
        :initial="{ y: 15, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.75 }"
        as-child
      >
        <AboutTechnologies />
      </Motion>
    </div>

    <!-- Experience -->
    <div class="flex flex-col gap-4">
      <motion.h1
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 1 }"
        class="text-2xl font-bold text-highlighted"
      >
        {{ t("about.experiences.title") }}
      </motion.h1>

      <Motion
        :initial="{ opacity: 0, y: 15 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 1.15 }"
        as-child
      >
        <AboutWorkExperiences />
      </Motion>
    </div>

    <!-- Education -->
    <div class="flex flex-col gap-4 mb-5 md:mb-16">
      <motion.h1
        :initial="{ y: 20, opacity: 0 }"
        :while-in-view="{ y: 0, opacity: 1 }"
        :in-view-options="{ once: true, amount: 'all' }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="text-2xl font-bold text-highlighted"
      >
        {{ t("about.education.title") }}
      </motion.h1>

      <Motion
        :initial="{ y: 15, opacity: 0 }"
        :while-in-view="{ y: 0, opacity: 1 }"
        :in-view-options="{ once: true, amount: 0.05 }"
        :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.1 }"
      >
        <AboutEducationExperiences />
      </Motion>
    </div>
  </div>
</template>
