<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
  link: string;
}>();
</script>

<template>
  <NuxtLink :to="link" target="_blank">
    <UBadge
      :icon="icon"
      color="primary"
      variant="subtle"
      class="rounded-full transition-all duration-200 hover:bg-primary/15"
    >
      {{ label }}
    </UBadge>
  </NuxtLink>
</template>
