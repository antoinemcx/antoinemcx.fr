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
    <div class="whitespace-pre-line">
      {{ description[0] }}
      <motion.div
        v-if="!showAllDescription && description.length > 1"
        :initial="{ opacity: 0, y: 5 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.15, delay: 0.18 }"
      >
        <UButton
          color="neutral"
          variant="ghost"
          class="rounded-lg py-0"
          @click="showAllDescription = true"
        >
          ...{{ t("readMore").toLowerCase() }}
        </UButton>
      </motion.div>
    </div>

    <!-- Additional information if read more button pressed -->
    <AnimatePresence>
      <motion.div
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
          v-if="index === description.slice(1).length - 1"
          color="neutral"
          variant="ghost"
          class="rounded-lg py-0"
          @click="showAllDescription = false"
        >
          ...{{ t("readLess").toLowerCase() }}
        </UButton>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
