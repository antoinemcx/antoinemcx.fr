<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const { github, githubRepo } = useRuntimeConfig();

const isMobileMenuOpen = ref(false);

const navItems = computed<DropdownMenuItem[][]>(() => [
  [
    { to: "/", label: t("navbar.home") },
    { to: "/about", label: t("navbar.about") },
    { to: "/projects", label: t("navbar.projects") },
  ],
]);

const githubLinks = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t("navbar.githubProfile"),
      to: github,
      target: "_blank",
      trailingIcon: "i-lucide-external-link",
    },
    {
      label: t("navbar.viewSource"),
      to: githubRepo,
      target: "_blank",
      trailingIcon: "i-lucide-external-link",
    },
  ],
]);
</script>

<template>
  <div class="flex justify-between items-center px-2 py-3 gap-2 md:gap-4">
    <NuxtLink to="/">
      <NuxtImg
        src="/logo.png"
        alt="Logo with an A"
        class="h-8 dark:invert dark:brightness-200"
      />
    </NuxtLink>

    <div class="flex items-center gap-8">
      <!-- Links on desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="(item, index) in navItems[0]"
          :key="index"
          :to="item.to"
          active-class="text-highlighted!"
          class="text-muted font-medium hover:text-highlighted duration-300 text-sm"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <LocaleSwitcher />

        <ThemeSwitcher />

        <UDropdownMenu :items="githubLinks">
          <UButton
            icon="uil:github"
            variant="subtle"
            color="neutral"
            size="sm"
            class="rounded-full"
          />
        </UDropdownMenu>

        <!-- Links inside a dropdown menu for smaller devices -->
        <UDropdownMenu
          v-model:open="isMobileMenuOpen"
          :items="navItems"
          class="md:hidden"
        >
          <UButton
            :icon="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            variant="subtle"
            color="neutral"
            size="sm"
            class="rounded-full transition-transform"
            :class="isMobileMenuOpen ? 'rotate-90 duration-250' : 'rotate-0 duration-200'"
          />
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>
