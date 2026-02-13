<script setup lang="ts">
const { t } = useI18n();

const isFlagHovered = ref(false);

const today = new Date();
const birthDate = new Date(2005, 11, 26);
const age = today.getFullYear() - birthDate.getFullYear() - (
  today.getMonth() < birthDate.getMonth()
  || (today.getMonth() === birthDate.getMonth()
    && today.getDate() < birthDate.getDate())
    ? 1 // not this year
    : 0
);
</script>

<template>
  <p class="text-lg items-center">
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
    <HeroCurrentUniversity is-always-underline />
    {{ t("about.intro.educationDepartment") }}
    {{ t("about.intro.company") }}
    <HeroCurrentCompany is-always-underline />
    {{ t("about.intro.work") }}

    <br><br>
    {{ t("about.whyComputerScience.intro") }}
    <UButton variant="link" color="neutral" size="xl" to="/projects">
      {{ t("about.whyComputerScience.projects") }}
    </UButton>
    {{ t("about.whyComputerScience.around") }}
    <UButton variant="link" color="neutral" size="xl" to="/projects/meliodas">
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
  </p>
</template>
