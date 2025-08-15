<script setup lang="ts">
defineProps<{
  isShortened?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <a
    :href="t('home.hero.description.sbsWebsite')"
    target="_blank"
    class="inline-flex gap-1 text-base font-semibold p-0!
    hover:underline hover:underline-offset-4 transition-colors duration-200
    text-fuchsia-600 hover:text-fuchsia-500
    dark:text-fuchsia-500 hover:dark:text-fuchsia-400
    decoration-fuchsia-500 dark:decoration-fuchsia-400"
  >
    {{ isShortened ? "SBS" : "SBS Software" }}
    <NuxtImg
      src="/icons/sbs.webp"
      alt="SBS Software"
      class="shrink-0 size-6 rounded-full"
    />
  </a>
</template>
