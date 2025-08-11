<script setup lang="ts">
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <UButton
    :icon="colorMode.value === 'dark' ? 'i-lucide-moon-star' : 'i-lucide-sun'"
    variant="subtle"
    color="neutral"
    size="sm"
    class="rounded-full active:translate-y-0.5 transition-transform duration-200"
    @click="toggleColorMode"
  />
</template>
