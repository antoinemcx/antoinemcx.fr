<script setup lang="ts">
const { locale } = useI18n();
useHead({
  htmlAttrs: {
    lang: locale,
  },
});

useSeoMeta({
  ogTitle: "Antoine M.",
  description: "I'm Antoine, a French software engineer. Learn more about me, my work and my projects on this website.",
  ogDescription: "I'm Antoine, a French software engineer. Learn more about me, my work and my projects on this website.",
  themeColor: "#2A7FFF",
});
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
