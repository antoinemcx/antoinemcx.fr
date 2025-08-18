<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id
  && ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true)
    || (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h1)));
</script>

<template>
  <h1 :id="props.id" class="mt-5 mb-2 font-semibold text-2xl text-highlighted">
    <a
      v-if="generate"
      :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
