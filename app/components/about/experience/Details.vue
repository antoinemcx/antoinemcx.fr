<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";

defineProps<{
  experience: ExperiencesCollectionItem;
  displayCompany: boolean;
}>();

const { t, d } = useI18n();
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-0.5 md:flex-row md:justify-between">
      <!-- Job title -->
      <component :is="displayCompany ? 'h2' : 'h3'" class="font-bold">
        {{ experience.jobTitle }}
        <span class="font-normal">· {{ experience.contract }}</span>
      </component>

      <!-- Experience dates and month duration -->
      <div :class="{ 'text-sm': !displayCompany }">
        <span :class="{ 'text-warning': new Date(experience.startDate) > new Date() }">
          {{ d(experience.startDate, { year: 'numeric', month: 'short' }) }}
        </span>
        -
        <span :class="{ 'font-semibold': !experience.endDate }">
          {{ experience.endDate
            ? d(experience.endDate, { year: 'numeric', month: 'short' })
            : t("about.experiences.today") }}
        </span>

        <span
          v-if="experience.monthDuration && experience.monthDuration > 0"
          class="text-muted"
        >
          (<AboutExperienceDuration
            :month-duration="experience.monthDuration"
          />)
        </span>
      </div>
    </div>

    <!-- Company information if single experience -->
    <div v-if="displayCompany">
      <p class="font-semibold">
        <a
          :href="experience.companyWebsite"
          target="_blank"
          :class="{
            'cursor-pointer hover:text-highlighted': experience.companyWebsite,
          }"
        >
          {{ experience.company }}
        </a>

        <span class="text-sm text-muted font-normal">
          ({{ experience.location }})
        </span>
      </p>
    </div>

    <!-- Description -->
    <AboutExperienceDescription :description="experience.description" />

    <!-- Mobilized skills -->
    <div v-if="experience.skills && experience.skills.length > 0" class="flex gap-1.5 mt-3">
      <UBadge
        v-for="skill in experience.skills"
        :key="skill"
        variant="soft"
        class="rounded-full"
      >
        {{ skill }}
      </UBadge>
    </div>
  </div>
</template>
