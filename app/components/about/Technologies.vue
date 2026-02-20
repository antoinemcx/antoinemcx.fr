<script setup lang="ts">
const { data: technologies }
  = await useAsyncData("technologies", async () => {
    return await queryCollection("technologies").first();
  });
</script>

<template>
  <div v-if="technologies" class="flex flex-wrap gap-2">
    <NuxtLink
      v-for="(techno, index) in technologies.items"
      :key="index"
      :href="techno.link"
      :aria-label="techno.name"
      target="_blank"
      :class="{ 'cursor-pointer': techno.link }"
    >
      <UBadge
        :avatar="{
          src: techno.icon,
          alt: techno.name,
        }"
        :ui="{
          leadingAvatar: 'rounded-none',
        }"
        variant="subtle"
        color="neutral"
        size="lg"
        class="rounded-full hover:scale-105 transition-transform duration-200"
        :class="index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'"
      >
        {{ techno.name }}
      </UBadge>
    </NuxtLink>
  </div>
</template>
