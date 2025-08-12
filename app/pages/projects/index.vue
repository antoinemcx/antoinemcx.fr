<script setup lang="ts">
const { t } = useI18n();

const initialProjectsCount = 8;
const displayAllProjects = ref(false);

/* Fetch all projects data */
const { data: projects, status } = await useProjectsContent();
</script>

<template>
  <h1 class="text-2xl text-highlighted font-bold">
    {{ t("projects.title") }}
  </h1>
  <p class="text-muted mb-5">
    {{ t("projects.description") }}
  </p>

  <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <UCard v-for="n in initialProjectsCount" :key="n">
      <USkeleton class="h-40" />
    </UCard>
  </div>
  <div v-else-if="!projects || projects.length === 0" class="text-muted">
    {{ t("projects.empty") }}
  </div>

  <div v-else>
    <!-- Initial list of initialProjectsCount projects -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ProjectCard
        v-for="project in projects.slice(0, initialProjectsCount)"
        :key="project.id"
        :project="project"
        is-large-card
      />
    </div>

    <!-- Other projects with a "view more" button -->
    <div v-if="displayAllProjects" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      <ProjectCard
        v-for="project in projects.slice(initialProjectsCount)"
        :key="project.id"
        :project="project"
        is-large-card
      />
    </div>

    <div class="flex justify-center mt-4">
      <UButton
        v-if="projects && projects.length > initialProjectsCount"
        color="neutral"
        variant="outline"
        :trailing-icon="displayAllProjects ? 'lucide:arrow-up' : 'lucide:arrow-down'"
        class="group w-fit active:translate-y-0.5 transition-transform duration-200"
        :ui="{
          trailingIcon: 'group-hover:scale-105 transition-transform duration-200',
        }"
        @click="displayAllProjects = !displayAllProjects"
      >
        {{ displayAllProjects ? t("projects.viewLess") : t("projects.viewMore") }}
      </UButton>
    </div>
  </div>
</template>
