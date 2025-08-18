<script setup lang="ts">
import { motion } from "motion-v";

defineProps<{
  show: boolean;
}>();

const { t } = useI18n();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="show"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.3, ease: 'easeOut' }"
      class="fixed bottom-6 right-6 z-50"
    >
      <UButton
        color="neutral"
        variant="subtle"
        icon="lucide:arrow-up"
        class="group rounded-full active:translate-y-0.5
        transition-transform duration-200"
        :ui="{
          leadingIcon:
            'group-hover:-translate-y-0.5 transition-transform duration-200',
        }"
        :aria-label="t('backToTop')"
        @click="scrollToTop"
      />
    </motion.div>
  </AnimatePresence>
</template>
