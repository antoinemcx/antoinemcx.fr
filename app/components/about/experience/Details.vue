<script setup lang="ts">
import type { EducationCollectionItem, ExperiencesCollectionItem } from "~/types/content";

const props = defineProps<{
  experience: {
    type: "work";
    data: ExperiencesCollectionItem;
  } | {
    type: "education";
    data: EducationCollectionItem;
  };
  displayCompany?: boolean;
}>();

const { t, d } = useI18n();

const monthDuration = computed(() => {
  if (props.experience.type === "work") {
    return props.experience.data.monthDuration;
  } else {
    return getMonthDifference(
      props.experience.data.endDate
        ? new Date(props.experience.data.endDate)
        : new Date(),
      new Date(props.experience.data.startDate),
    );
  }
});
const monthFormat = monthDuration.value && monthDuration.value <= 12
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
            :href="experience.data.companyWebsite"
            target="_blank"
            :class="{
              'cursor-pointer hover:text-highlighted': experience.data.companyWebsite,
            }"
          >
            {{ experience.data.company }}
          </a>

          <span class="text-sm text-muted font-normal">
            ({{ experience.data.location }})
          </span>
        </p>
      </h2>
      <h3 v-else class="font-bold">
        {{ experience.data.title }}
        <span v-if="experience.data.contract" class="font-normal">
          · {{ experience.data.contract }}
        </span>
      </h3>

      <!-- Experience dates and month duration -->
      <div :class="{ 'text-sm': !displayCompany }">
        <span
          :class="{
            'text-warning': new Date(experience.data.startDate) > new Date(),
          }"
        >
          {{ d(experience.data.startDate,
               { year: 'numeric', month: monthFormat }) }}
        </span>
        -
        <span :class="{ 'font-semibold': !experience.data.endDate }">
          {{ experience.data.endDate
            ? d(experience.data.endDate, { year: 'numeric', month: monthFormat })
            : t("about.experiences.today") }}
        </span>

        <span
          v-if="experience.type === 'work'
            && experience.data.monthDuration && experience.data.monthDuration > 0"
          class="text-muted"
        >
          (<AboutExperienceDuration
            :month-duration="experience.data.monthDuration"
          />)
        </span>
      </div>
    </div>

    <!-- Job title -->
    <p v-if="displayCompany" class="font-bold">
      {{ experience.data.title }}
      <span v-if="experience.data.contract" class="font-normal">
        · {{ experience.data.contract }}
      </span>
    </p>

    <!-- Description -->
    <AboutExperienceDescription :description="experience.data.description" />

    <!-- Mobilized skills -->
    <div
      v-if="experience.data.skills && experience.data.skills.length > 0"
      class="flex flex-wrap gap-1.5 mt-3"
    >
      <UBadge
        v-for="skill in experience.data.skills"
        :key="skill"
        variant="soft"
        class="rounded-full"
      >
        {{ skill }}
      </UBadge>
    </div>
  </div>
</template>
