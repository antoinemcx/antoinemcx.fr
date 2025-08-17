<script setup lang="ts">
/* Fetch all experiences */
const { experiences, status } = useExperiencesContent();
</script>

<template>
  <div v-if="status === 'pending'" class="flex flex-col gap-4">
    <AboutExperiencesCompany v-for="n in 3" :key="n" />
  </div>

  <div v-else-if="status === 'success' && experiences" class="flex flex-col gap-8">
    <AboutExperiencesCompany
      v-for="(companyExperiences, index) in experiences"
      :key="index"
      :experiences="companyExperiences"
    />
  </div>
</template>
