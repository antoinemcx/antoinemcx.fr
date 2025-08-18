<script setup lang="ts">
import { motion } from "motion-v";

const isScrolled = ref(false);
const isFarScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
  isFarScrolled.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen flex flex-col scroll-smooth">
    <!-- Navigation bar fixed at the top -->
    <motion.div
      :initial="{ y: -20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
      class="fixed top-0 left-0 right-0 z-50 bg-default transition-shadow duration-300"
      :class="{
        'shadow-sm dark:shadow-md shadow-neutral-200/75 dark:shadow-neutral-800/25':
          isScrolled,
      }"
    >
      <div class="max-w-5xl mx-auto px-4 md:px-6">
        <Navbar />
      </div>
    </motion.div>

    <!-- Page content -->
    <div class="flex-1 pt-24 pb-5 max-w-5xl mx-auto px-4 md:px-6 w-full">
      <slot />
    </div>

    <!-- Footer fixed at the bottom -->
    <motion.div
      :initial="{ scale: 0.99, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.7, ease: 'easeOut', delay: 0.2 }"
      class="max-w-5xl mx-auto px-4 md:px-6 w-full"
    >
      <Footer />
    </motion.div>

    <!-- Back to top button -->
    <BackToTopButton :show="isFarScrolled" />
  </div>
</template>
