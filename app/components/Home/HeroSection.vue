<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-2 py-18">
    <NuxtImg src="/photo.jpg" class="size-20 rounded-full" draggable="false" />

    <h1 class="text-3xl font-bold text-highlighted mt-1">
      {{ t("home.hero.title") }}
      <span class="cursor-default inline-block wave">👋</span>
    </h1>

    <!-- Short introduction -->
    <p class="text-lg">
      {{ t("home.hero.description.intro") }}
      <br>
      {{ t("home.hero.description.interests") }}
      <a
        :href="t('home.hero.description.enseeihtWebsite')"
        target="_blank"
        class="inline-flex gap-1.25 text-base font-semibold p-0!
          hover:underline hover:underline-offset-4 transition-colors duration-200
          text-primary-800 hover:text-primary-600
          dark:text-primary-500 hover:dark:text-primary-400
          decoration-primary-600 dark:decoration-primary-400"
      >
        {{ t("home.hero.description.enseeiht") }}
        <NuxtImg
          src="/icons/n7.webp"
          alt="ENSEEIHT"
          class="shrink-0 size-5.5 rounded-full"
        />
      </a>
      {{ t("home.hero.description.workingAt") }}
      <a
        :href="t('home.hero.description.sbsWebsite')"
        target="_blank"
        class="inline-flex gap-1 text-base font-semibold p-0!
          hover:underline hover:underline-offset-4 transition-colors duration-200
          text-fuchsia-600 hover:text-fuchsia-500
          dark:text-fuchsia-500 hover:dark:text-fuchsia-400
          decoration-fuchsia-500 dark:decoration-fuchsia-400"
      >
        SBS
        <NuxtImg
          src="/icons/sbs.webp"
          alt="SBS Software"
          class="shrink-0 size-6 rounded-full"
        />
      </a>.
    </p>
  </div>
</template>

<style scoped>
.wave:hover {
  animation: wave 1.25s normal infinite;
}

@keyframes wave {
  0%, 10% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(14deg);
  }
  30% {
    transform: rotate(-7deg);
  }
  40% {
    transform: rotate(12deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  60% {
    transform: rotate(9deg);
  }
  70%, 80%, 90%, 100% {
    transform: rotate(0deg);
  }
}
</style>
