<script setup lang="ts">
import { motion } from "motion-v";

defineProps<{
  showEasterEgg: boolean;
}>();

defineSlots<{
  default: () => any;
  egg: () => any;
}>();
</script>

<template>
  <!-- Easter egg component -->
  <motion.span
    v-if="showEasterEgg"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.3 }"
  >
    <slot name="egg" />
  </motion.span>

  <!-- Default display -->
  <motion.span
    v-else
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.3 }"
  >
    <slot />
  </motion.span>
</template>
