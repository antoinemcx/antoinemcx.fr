<script setup lang="ts">
const { t } = useI18n();

/* Fetch all projects data */
const { data: projects, status } = await useProjectsContent();
</script>

<template>
  <h1 class="text-2xl text-highlighted font-bold">
    {{ t("projects.title") }}
  </h1>
  <p class="text-muted mb-5">
    {{ t("home.featuredProjects.description") }}
  </p>

  <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <UCard v-for="n in 6" :key="n">
      <USkeleton class="h-36" />
    </UCard>
  </div>

  <div v-else-if="!projects || projects.length === 0" class="text-muted">
    {{ t("projects.empty") }}
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      is-large-card
    />
  </div>
</template>
