<script setup lang="ts">
import { motion } from "motion-v";

defineProps<{
  description: string[];
}>();

const { t } = useI18n();
const showAllDescription = ref(false);
</script>

<template>
  <div v-if="description.length > 0" class="mt-1 text-sm">
    <!-- Short description -->
    <p class="whitespace-pre-line">
      {{ description[0] }}
      <Motion
        v-if="!showAllDescription && description.length > 1"
        :initial="{ opacity: 0, y: 5 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.15, delay: 0.15 }"
        as-child
      >
        <UButton
          color="neutral"
          variant="ghost"
          class="rounded-lg py-0"
          @click="showAllDescription = true"
        >
          ...{{ t("readMore").toLowerCase() }}
        </UButton>
      </Motion>
    </p>

    <!-- Additional information if read more button pressed -->
    <AnimatePresence>
      <motion.p
        v-for="(other, index)
          in (showAllDescription ? description.slice(1) : [])"
        :key="index"
        class="whitespace-pre-line"
        :initial="{ opacity: 0, y: -10 }"
        :animate="{ opacity: 1, y: 0, transition: { duration: 0.2 } }"
        :exit="{ opacity: 0, y: 10, transition: { duration: 0.15 } }"
      >
        {{ other }}
        <UButton
          v-if="index === description.length - 1"
          color="neutral"
          variant="ghost"
          class="rounded-lg py-0"
          @click="showAllDescription = false"
        >
          ...{{ t("readLess").toLowerCase() }}
        </UButton>
      </motion.p>
    </AnimatePresence>
  </div>
</template>
