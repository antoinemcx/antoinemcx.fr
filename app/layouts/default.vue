<script setup lang="ts">
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
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
    <div
      class="fixed top-0 left-0 right-0 z-50 bg-[var(--ui-bg)] transition-shadow duration-300"
      :class="{
        'shadow-sm dark:shadow-md shadow-neutral-200/75 dark:shadow-neutral-800/25': isScrolled,
      }"
    >
      <div class="max-w-5xl mx-auto px-4 md:px-6">
        <Navbar />
      </div>
    </div>

    <!-- Page content -->
    <div class="flex-1 pt-16 pb-5 max-w-5xl mx-auto px-4 md:px-6 w-full">
      <slot />
    </div>

    <!-- Footer fixed at the bottom -->
    <div class="max-w-5xl mx-auto px-4 md:px-6 w-full">
      <Footer />
    </div>
  </div>
</template>
