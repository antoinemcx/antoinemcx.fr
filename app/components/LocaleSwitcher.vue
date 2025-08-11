<script setup lang="ts">
const { currentLanguage, switchToNextLanguage } = useLanguage();
</script>

<template>
  <UButton
    variant="subtle"
    color="neutral"
    size="sm"
    class="rounded-full active:translate-y-0.5 transition-transform duration-200"
    :icon="currentLanguage?.flag"
    :aria-label="currentLanguage?.name"
    @click="switchToNextLanguage"
  />
</template>
