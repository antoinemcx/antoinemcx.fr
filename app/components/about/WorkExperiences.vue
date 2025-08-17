<script setup lang="ts">
/* Fetch all experiences */
const { experiences, status } = useWorkExperiencesContent();
</script>

<template>
  <div v-if="status === 'pending'" class="flex flex-col gap-4">
    <AboutCompanyExperiences v-for="n in 3" :key="n" />
  </div>

  <div v-else-if="status === 'success' && experiences" class="flex flex-col gap-8">
    <AboutCompanyExperiences
      v-for="(companyExperiences, index) in experiences"
      :key="index"
      :experiences="companyExperiences"
    />
  </div>
</template>
