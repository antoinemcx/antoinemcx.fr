<script setup lang="ts">
export interface Technology {
  name: string;
  icon?: string;
  link?: string;
}

const technologies: Technology[] = [
  {
    name: "JavaScript",
    icon: "/icons/technos/js.svg",
    link: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    icon: "/icons/technos/ts.svg",
    link: "https://www.typescriptlang.org/",
  },
  { name: "Vue.js", icon: "/icons/technos/vuejs.svg", link: "https://vuejs.org/" },
  { name: "Nuxt.js", icon: "/icons/technos/nuxtjs.svg", link: "https://nuxtjs.org/" },
  { name: "React", icon: "/icons/technos/react.svg", link: "https://react.dev/" },
  { name: "Next.js", icon: "/icons/technos/nextjs.svg", link: "https://nextjs.org/" },
  { name: "Node.js", icon: "/icons/technos/nodejs.svg", link: "https://nodejs.org/en" },
  {
    name: "TailwindCSS",
    icon: "/icons/technos/tailwindcss.svg",
    link: "https://tailwindcss.com/",
  },
  { name: "Motion", icon: "/icons/technos/motion.svg", link: "https://motion.dev/" },
  { name: "Java", icon: "/icons/technos/java.svg", link: "https://oracle.com/java/" },
  {
    name: "Spring Boot",
    icon: "/icons/technos/spring_boot.svg",
    link: "https://spring.io/projects/spring-boot",
  },
  { name: "MySQL", icon: "/icons/technos/mysql.svg", link: "https://mysql.com/" },
  { name: "Jest", icon: "/icons/technos/jest.svg", link: "https://jestjs.io" },
  { name: "JUnit", icon: "/icons/technos/junit.svg", link: "https://junit.org/" },
  { name: "Docker", icon: "/icons/technos/docker.svg", link: "https://docker.com/" },
  { name: "Git", icon: "/icons/technos/git.svg", link: "https://git-scm.com" },
];
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <NuxtLink
      v-for="(tech, index) in technologies"
      :key="index"
      :href="tech.link"
      target="_blank"
      :class="{ 'cursor-pointer': tech.link }"
    >
      <UBadge
        :avatar="{
          src: tech.icon,
          alt: tech.name,
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
        {{ tech.name }}
      </UBadge>
    </NuxtLink>
  </div>
</template>
