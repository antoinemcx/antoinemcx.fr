<script setup lang="ts">
defineProps<{
  isAlwaysUnderline?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <a
    :href="t('home.hero.description.enseeihtWebsite')"
    target="_blank"
    class="inline-flex gap-1.25 text-base font-semibold p-0!
    hover:underline underline-offset-4 transition-colors duration-200
    text-primary-800 hover:text-primary-600
    dark:text-primary-500 hover:dark:text-primary-400
    hover:decoration-primary-600 hover:dark:decoration-primary-400
    "
    :class="{
      'underline decoration-primary-800 dark:decoration-primary-500':
        isAlwaysUnderline,
    }"
  >
    {{ t("home.hero.description.enseeiht") }}
    <NuxtImg
      src="/icons/n7.webp"
      alt="ENSEEIHT"
      class="shrink-0 size-5.5 rounded-full"
    />
  </a>
</template>
