<script setup lang="ts">
const { discordServer, github } = useRuntimeConfig();
const icons = [
  {
    name: "GitHub",
    icon: "simple-icons:github",
    link: github,
  },
  {
    name: "Discord",
    icon: "simple-icons:discord",
    link: discordServer,
  },
  {
    name: "X",
    icon: "simple-icons:x",
    link: "https://x.com/dev_melio",
  },
  {
    name: "LinkedIn",
    icon: "simple-icons:linkedin",
    link: "https://www.linkedin.com/in/antoine-mcx/",
  },
];
</script>

<template>
  <div class="flex items-center gap-3">
    <NuxtLink
      v-for="icon in icons"
      :key="icon.name"
      :to="icon.link"
      target="_blank"
      class="flex items-center gap-2 text-muted/75 hover:text-highlighted
      hover:rotate-6 transition-all duration-200 cursor-pointer"
    >
      <Icon :name="icon.icon" class="size-4.5" />
      <span class="sr-only">{{ icon.name }}</span>
    </NuxtLink>
  </div>
</template>
