<script setup lang="ts">
import type { ExperiencesCollectionItem } from "~/types/content";

const props = defineProps<{
  experience: ExperiencesCollectionItem;
  displayCompany?: boolean;
}>();

const { t, d } = useI18n();

const monthFormat
= props.experience.monthDuration && props.experience.monthDuration <= 12
  ? "short"
  : undefined; // do not display months if more than a year
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-0.5 md:flex-row md:justify-between">
      <!-- Company information if single experience -->
      <h2 v-if="displayCompany">
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
      </h2>
      <h3 v-else class="font-bold">
        {{ experience.jobTitle }}
        <span class="font-normal">· {{ experience.contract }}</span>
      </h3>

      <!-- Experience dates and month duration -->
      <div :class="{ 'text-sm': !displayCompany }">
        <span :class="{ 'text-warning': new Date(experience.startDate) > new Date() }">
          {{ d(experience.startDate, { year: 'numeric', month: monthFormat }) }}
        </span>
        -
        <span :class="{ 'font-semibold': !experience.endDate }">
          {{ experience.endDate
            ? d(experience.endDate, { year: 'numeric', month: monthFormat })
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

    <!-- Job title -->
    <p v-if="displayCompany" class="font-bold">
      {{ experience.jobTitle }}
      <span class="font-normal">· {{ experience.contract }}</span>
    </p>

    <!-- Description -->
    <AboutExperienceDescription :description="experience.description" />

    <!-- Mobilized skills -->
    <div
      v-if="experience.skills && experience.skills.length > 0"
      class="flex flex-wrap gap-1.5 mt-3"
    >
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
