<script setup lang="ts">
const colorMode = useColorMode();

/**
 * Uses View Transition API to animate color mode switch.
 * If the browser is set to reduced motion, the effect will not be applied.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
 */
async function toggleColorMode() {
  /* Check if browser supports and enabled View Transition API */
  const transitionsEnabled = document
    && document.startViewTransition !== undefined
    && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (!transitionsEnabled) {
    toggleColorModeValue();
  }

  document.startViewTransition(async () => {
    toggleColorModeValue();
    await nextTick();
  });
}

function toggleColorModeValue() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="colorMode.value === 'dark' ? 'i-lucide-moon-star' : 'i-lucide-sun'"
      variant="subtle"
      color="neutral"
      size="sm"
      class="rounded-full active:translate-y-0.5 transition-transform duration-200"
      @click="toggleColorMode"
    />

    <template #fallback>
      <UButton
        icon="i-lucide-sun"
        variant="subtle"
        color="neutral"
        size="sm"
        class="rounded-full"
        disabled
      />
    </template>
  </ClientOnly>
</template>
