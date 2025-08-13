<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();
</script>

<template>
  <motion.div
    :initial="{ y: 25, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.7, ease: 'easeOut', delay: 0.25 }"
    class="flex flex-col gap-2 pt-1 md:pt-2 pb-11 hlg:pb-18"
  >
    <!-- Header -->
    <motion.div
      :initial="{ y: -5, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.3 }"
    >
      <NuxtImg src="/photo.jpg" class="size-20 rounded-full" draggable="false" />
    </motion.div>

    <motion.h1
      :initial="{ y: 15, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.55 }"
      class="text-3xl font-bold text-highlighted mt-1"
    >
      {{ t("home.hero.title") }}

      <!-- Animated wave emoji -->
      <motion.span
        class="cursor-default inline-block"
        :while-hover="{
          rotate: [0, 14, -7, 12, -3, 9, 0, 0, 0, 0],
          transition: { duration: 1.25, ease: 'easeInOut', repeat: Infinity },
        }"
      >
        👋
      </motion.span>
    </motion.h1>

    <!-- Short introduction -->
    <motion.p
      :initial="{ y: 15, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.75 }"
      class="text-lg"
    >
      {{ t("home.hero.description.intro") }}
      <br>
      {{ t("home.hero.description.interests") }}
      <a
        :href="t('home.hero.description.enseeihtWebsite')"
        target="_blank"
        class="inline-flex gap-1.25 text-base font-semibold p-0!
          hover:underline hover:underline-offset-4 transition-colors duration-200
          text-primary-800 hover:text-primary-600
          dark:text-primary-500 hover:dark:text-primary-400
          decoration-primary-600 dark:decoration-primary-400"
      >
        {{ t("home.hero.description.enseeiht") }}
        <NuxtImg
          src="/icons/n7.webp"
          alt="ENSEEIHT"
          class="shrink-0 size-5.5 rounded-full"
        />
      </a>
      {{ t("home.hero.description.workingAt") }}
      <a
        :href="t('home.hero.description.sbsWebsite')"
        target="_blank"
        class="inline-flex gap-1 text-base font-semibold p-0!
          hover:underline hover:underline-offset-4 transition-colors duration-200
          text-fuchsia-600 hover:text-fuchsia-500
          dark:text-fuchsia-500 hover:dark:text-fuchsia-400
          decoration-fuchsia-500 dark:decoration-fuchsia-400"
      >
        SBS
        <NuxtImg
          src="/icons/sbs.webp"
          alt="SBS Software"
          class="shrink-0 size-6 rounded-full"
        />
      </a>.
    </motion.p>
  </motion.div>
</template>

<style scoped>
@media (height >= 59.5rem) {
  .hlg\:pb-18 { /* guarantees not to exceed the height of desktop screen */
    padding-bottom: calc(var(--spacing) * 18)!important;
  }
}
</style>
