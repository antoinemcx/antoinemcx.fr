<script setup lang="ts">
defineProps<{
  monthDuration: number;
}>();

const { t } = useI18n();
</script>

<template>
  <span v-if="monthDuration > 12 * 2">
    {{ t("about.experiences.xYears", { count: Math.floor(monthDuration / 12) }) }}
    {{ t("about.experiences.xMonths", { count: monthDuration % 12 }) }}
  </span>
  <span v-else-if="monthDuration > 12">
    {{ t("about.experiences.xYears", { count: Math.floor(monthDuration / 12) }) }}
  </span>
  <span v-else-if="monthDuration > 0">
    {{ t("about.experiences.xMonths", { count: monthDuration }) }}
  </span>
</template>
