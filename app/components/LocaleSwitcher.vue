<script setup lang="ts">
const { currentLanguage, switchToNextLanguage } = useLanguage();
</script>

<template>
  <UButton
    variant="subtle"
    color="neutral"
    size="sm"
    class="rounded-full"
    :label="currentLanguage?.flag"
    :aria-label="currentLanguage?.name"
    @click="switchToNextLanguage"
  />
</template>
