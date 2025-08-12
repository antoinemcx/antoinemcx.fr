<script setup lang="ts">
const { t } = useI18n();

const initialProjectsCount = 8;
const displayAllProjects = ref(false);

/* Fetch all projects data */
const { data: projects, status } = await useProjectsContent();
const tags = computed<string[]>(() => {
  const allTags = new Set<string>();
  projects.value?.forEach((project) => {
    project.tags?.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags);
});

/* Tags filter */
const selectedTags = ref<string[]>([]);
const hoveredTag = ref<string | null>(null);
const filteredProjects = computed(() =>
  selectedTags.value.length === 0
    ? projects.value // no filter
    : projects.value?.filter(project =>
        project.tags?.some(tag => selectedTags.value.includes(tag)),
      ),
);

function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}
</script>

<template>
  <h1 class="text-2xl text-highlighted font-bold">
    {{ t("projects.title") }}
  </h1>
  <p class="text-muted mb-3">
    {{ t("projects.description") }}
  </p>

  <!-- Tags filter -->
  <div v-if="tags.length > 0" class="flex items-center gap-2 mb-4">
    <span class="text-muted font-semibold">
      {{ t("projects.tagsFilter") }}
    </span>
    <div class="flex flex-wrap gap-1.5">
      <UBadge
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        color="neutral"
        variant="subtle"
        class="h-fit cursor-pointer rounded-full hover:bg-accented/75 transition-colors duration-300"
        :class="selectedTags.length === 0
          ? (hoveredTag === null || hoveredTag === tag
            ? 'bg-accented/75' : 'bg-accented/25')
          : (selectedTags.includes(tag)
            ? 'bg-accented/75' : 'bg-accented/25')"
        @click="toggleTag(tag)"
        @mouseenter="hoveredTag = tag"
        @mouseleave="hoveredTag = null"
      />
    </div>

    <!-- Clear filter button -->
    <UButton
      v-if="selectedTags.length > 0"
      size="sm"
      color="error"
      variant="ghost"
      icon="lucide:trash"
      class="rounded-4xl p-1!"
      @click="selectedTags = []"
    />
  </div>

  <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <UCard v-for="n in initialProjectsCount" :key="n">
      <USkeleton class="h-40" />
    </UCard>
  </div>
  <div
    v-else-if="!projects || projects.length === 0 || !filteredProjects"
    class="text-muted"
  >
    {{ t("projects.empty") }}
  </div>

  <div v-else-if="filteredProjects.length === 0" class="text-muted">
    {{ t("projects.noMatchingProjects") }}
  </div>

  <div v-else>
    <!-- Initial list of initialProjectsCount projects -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ProjectCard
        v-for="project in filteredProjects.slice(0, initialProjectsCount)"
        :key="project.id"
        :project="project"
        is-large-card
      />
    </div>

    <!-- Other projects with a "view more" button -->
    <div v-if="displayAllProjects" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      <ProjectCard
        v-for="project in filteredProjects.slice(initialProjectsCount)"
        :key="project.id"
        :project="project"
        is-large-card
      />
    </div>

    <div class="flex justify-center mt-4">
      <UButton
        v-if="filteredProjects && filteredProjects.length > initialProjectsCount"
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
