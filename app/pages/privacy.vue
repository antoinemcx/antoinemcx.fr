<script setup lang="ts">
import { motion } from "motion-v";

const { t, d } = useI18n();

const lastEditDate = new Date("2025-08-19");
</script>

<template>
  <motion.div
    :initial="{ y: 20, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.65, ease: 'easeOut', delay: 0.2 }"
    class="flex flex-col gap-10"
  >
    <div>
      <h1 class="text-2xl font-bold text-highlighted mb-0.5">
        {{ t('privacy.title') }}
      </h1>
      <p class="text-muted">
        {{ t('privacy.subtitle', { date: d(lastEditDate) }) }}
      </p>
    </div>

    <p>
      {{ t('privacy.intro') }}
    </p>

    <!-- Editor -->
    <div>
      <h2 class="text-xl font-bold text-highlighted">
        {{ t('privacy.editorTitle') }}
      </h2>
      <p class="whitespace-pre-line">
        {{ t('privacy.editorContent') }}
      </p>
    </div>

    <!-- Host -->
    <div>
      <h2 class="text-xl font-bold text-highlighted">
        {{ t('privacy.hostTitle') }}
      </h2>
      <p class="whitespace-pre-line">
        {{ t('privacy.hostContent') }}
      </p>
    </div>

    <!-- Terms of Use -->
    <div>
      <h2 class="text-xl font-bold text-highlighted">
        {{ t('privacy.termsTitle') }}
      </h2>
      <p class="whitespace-pre-line">
        {{ t("privacy.termsContent") }}
        <UButton variant="link" color="neutral" size="xl" to="#contact">
          {{ t("privacy.beContacted") }}
        </UButton>.
      </p>
    </div>

    <!-- Collected data -->
    <div>
      <h2 class="text-xl font-bold text-highlighted">
        {{ t('privacy.dataTitle') }}
      </h2>
      <p class="whitespace-pre-line">
        {{ t('privacy.dataContent') }}
      </p>
    </div>

    <!-- Intellectual Property -->
    <div>
      <h2 class="text-xl font-bold text-highlighted">
        {{ t('privacy.ipTitle') }}
      </h2>
      <p class="whitespace-pre-line">
        {{ t('privacy.ipContent') }}
      </p>
    </div>

    <!-- Contact -->
    <div>
      <h2 id="contact" class="text-xl font-bold text-highlighted">
        {{ t('privacy.contactTitle') }}
      </h2>
      <p class="mb-8 whitespace-pre-line">
        {{ t('privacy.contactContent') }}
        <UButton variant="link" color="neutral" size="xl" to="/discord" target="_blank">
          {{ t('privacy.discordServer') }}
        </UButton>.
      </p>
    </div>
  </motion.div>
</template>
