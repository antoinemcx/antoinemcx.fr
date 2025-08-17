<script setup lang="ts">
/* Fetch all education data */
const { educationItems, status } = useEducationContent();
</script>

<template>
  <div v-if="status === 'pending'" class="flex flex-col gap-4">
    <AboutEducationItem v-for="n in 3" :key="n" />
  </div>

  <div
    v-else-if="status === 'success' && educationItems"
    class="flex flex-col gap-8"
  >
    <AboutEducationItem
      v-for="(educationItem, index) in educationItems"
      :key="index"
      :education="educationItem"
    />
  </div>
</template>
