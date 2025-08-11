<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-3 md:gap-2 px-2 pt-3 pb-4">
    <div class="flex justify-between md:items-center flex-col md:flex-row md:gap-4">
      <a class="text-lg font-bold text-highlighted" href="/github" target="_blank">
        Antoine M.
      </a>

      <div>
        {{ t("footer.madeWith") }}
        <span class="heart-beat">❤️</span>
        {{ t("footer.using") }}
        <span class="font-semibold">Nuxt.js</span>.
      </div>
    </div>

    <div class="flex justify-between md:items-center flex-col md:flex-row gap-2 md:gap-4">
      <!-- Copyright -->
      <div class="font-normal">
        ©
        {{ new Date().getFullYear() }}
        Antoine Marescaux.
        {{ t("footer.allRightReserved") }}
      </div>

      <SocialIcons icon-size="sm" />
    </div>
  </div>
</template>

<style scoped>
.heart-beat {
  display: inline-block;
  cursor: default;
  transition: transform 0.3s ease;
}

.heart-beat:hover {
  animation: heartbeat 1.2s ease-in-out infinite;
}

.dark .heart-beat:hover {
  animation: heartbeat-dark 1.2s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 20%, 40%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(255, 105, 180, 0.5));
  }
  10%, 30% {
    transform: scale(1.2);
    filter: drop-shadow(0 0 4px rgba(255, 105, 180, 0.8));
  }
}

@keyframes heartbeat-dark {
  0%, 20%, 40%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(255, 182, 193, 0.5));
  }
  10%, 30% {
    transform: scale(1.2);
    filter: drop-shadow(0 0 4px rgba(255, 182, 193, 0.9));
  }
}
</style>
