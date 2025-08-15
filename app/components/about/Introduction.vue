<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();

const isFlagHovered = ref(false);

const today = new Date();
const birthDate = new Date(2005, 12, 26);
const age = today.getFullYear() - birthDate.getFullYear() - (
  today.getMonth() < birthDate.getMonth()
  || (today.getMonth() === birthDate.getMonth()
    && today.getDate() < birthDate.getDate())
    ? 1 // not this year
    : 0
);
</script>

<template>
  <div class="flex flex-col gap-3">
    <motion.h1
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.1 }"
      class="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-2xl font-bold text-highlighted"
    >
      <span class="tracking-[-0.015em] mr-1">{{ t("about.im") }}</span>
      <span class="heading-font mt-0.5">Antoine Marescaux,</span>
      <span class="tracking-[-0.015em] ml-1">{{ t("about.jobTitle") }}</span>
    </motion.h1>

    <motion.p
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.55, ease: 'easeOut', delay: 0.3 }"
      class="text-lg items-center"
    >
      {{ t("about.intro.currentlyIn") }}

      <UButton
        variant="link"
        color="neutral"
        size="xl"
        to="https://maps.app.goo.gl/6neozYApJpQVrJEZ6"
        target="_blank"
        @mouseover="isFlagHovered = true" @mouseleave="isFlagHovered = false"
      >
        <span>
          Toulouse
          <!-- Baguette easter egg -->
          <EasterEggDisplay :show-easter-egg="isFlagHovered">
            🇫🇷
            <template #egg>
              🥖
            </template>
          </EasterEggDisplay>
        </span>
      </UButton>

      <!-- Short description -->
      {{ t("about.intro.studies") }}
      <HeroCurrentUniversity />
      {{ t("about.intro.educationDepartment") }}
      {{ t("about.intro.company") }}
      <HeroCurrentCompany />
      {{ t("about.intro.work") }}

      <br><br>
      {{ t("about.whyComputerScience.intro") }}
      <UButton variant="link" color="neutral" size="xl" to="/projects">
        {{ t("about.whyComputerScience.projects") }}
      </UButton>
      {{ t("about.whyComputerScience.around") }}
      <UButton variant="link" color="neutral" size="xl" to="/projects">
        Méliodas
      </UButton>
      {{ t("about.whyComputerScience.thatFollowedMe") }}
      {{ t("about.whyComputerScience.moreThanHobby") }}

      <br><br>
      {{ t("about.whatILike.intro", { age }) }}
      <UButton
        variant="link"
        color="neutral"
        size="xl"
        to="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
        target="_blank"
        :label="t('about.whatILike.developerExperience')"
      />.
      {{ t("about.whatILike.onGoing") }}
    </motion.p>
  </div>
</template>
