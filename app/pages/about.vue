<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <motion.div
    :initial="{ y: 20, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.1 }"
    class="flex flex-col gap-6"
  >
    <!-- Intro -->
    <AboutIntroduction />

    <!-- Skills -->
    <!-- TODO -->

    <!-- Experience -->
    <!-- TODO -->
    <div class="flex flex-col gap-3">
      <h1 class="text-2xl font-bold text-highlighted">
        TODO
      </h1>
    </div>
  </motion.div>
</template>
