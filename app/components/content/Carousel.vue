<script setup lang="ts">
defineProps<{
  imageLinks: string[];
}>();
</script>

<template>
  <!-- Carousel if multiple images -->
  <UCarousel
    v-if="imageLinks.length > 1"
    v-slot="{ item }"
    auto-height
    arrows
    dots
    :items="imageLinks"
    :ui="{
      container: 'transition-[height]',
      dot: 'w-6 h-1',
    }"
    class="max-w-[85%] mx-auto"
  >
    <NuxtImg :src="item" width="auto" height="450" class="rounded-md" />
  </UCarousel>

  <!-- Immediate image if not -->
  <NuxtImg
    v-else
    :src="imageLinks[0]"
    width="auto"
    height="450"
    class="rounded-md mx-auto"
    placeholder
  />
</template>
