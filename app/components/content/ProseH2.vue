<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id
  && ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true)
    || (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2)));
</script>

<template>
  <h2 :id="props.id" class="mt-1.5 mb-1 font-semibold text-xl text-highlighted">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
