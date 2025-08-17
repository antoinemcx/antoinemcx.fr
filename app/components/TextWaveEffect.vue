<script setup lang="ts">
import { motion } from "motion-v";
import { computed } from "vue";

const props = defineProps<{
  text: string;
  duration?: number;
}>();

const duration = props.duration ?? 1;
const zDistance = 10;
const xDistance = 2;
const yDistance = -2;
const spread = 1;
const scaleDistance = 1.1;
const rotateYDistance = 10;

const waveEffect = {
  translateZ: [0, zDistance, 0],
  translateX: [0, xDistance, 0],
  translateY: [0, yDistance, 0],
  scale: [1, scaleDistance, 1],
  rotateY: [0, rotateYDistance, 0],
};

const isWordHovered = ref(false); // to trigger the animation
const characters = computed(() => props.text.split(""));
</script>

<template>
  <span
    class="relative inline-block [perspective:500px]"
    @mouseenter="isWordHovered = true"
    @mouseleave="isWordHovered = false"
  >
    <!-- Animated characters -->
    <motion.span
      v-for="(char, i) in characters"
      :key="i"
      class="inline-block whitespace-pre [transform-style:preserve-3d]"
      :initial="{ translateZ: 0, scale: 1, rotateY: 0, opacity: 1 }"
      :animate="isWordHovered ? {
        ...waveEffect,
        opacity: [1, 0.75, 1], // color effect
      } : undefined"
      :transition="{
        duration,
        repeat: isWordHovered ? Infinity : 0,
        repeatDelay: ((props.text.length * 0.05) / spread) + 1,
        delay: (i * duration * (1 / spread)) / props.text.length,
        // Custom ease, slightly easeIn
        ease: [0, 0.2, 0.45, 1],
      }"
    >
      {{ char }}
    </motion.span>
  </span>
</template>
