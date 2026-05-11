<script setup lang="ts">
const { locale } = useI18n();
useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});

const origin = "https://antoinemcx.fr"; // raw value to avoid hydration issues
const title = "Antoine M. - Software Engineer Portfolio";
const description
  = "I'm Antoine, a French software engineer. Learn more about me, my work and my projects on this website.";
const ogImageAlt = "Antoine M. - Software Engineer Portfolio";
useSeoMeta({
  ogType: "website",
  themeColor: "#45556c",
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: `${origin}/og-image.png`,
  ogImageSecureUrl: `${origin}/og-image.png`,
  ogImageAlt,
  ogUrl: origin,
  ogImageHeight: 630,
  ogImageWidth: 1200,
  ogImageType: "image/png",
  twitterImage: `${origin}/og-image.png`,
  twitterImageAlt: ogImageAlt,
  twitterCard: "summary_large_image",
  twitterCreator: "@antoinemcx",
});
</script>

<template>
  <NuxtLayout>
    <UApp :tooltip="{ delayDuration: 300 }">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
