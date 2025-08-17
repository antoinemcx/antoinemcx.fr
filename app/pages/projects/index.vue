<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";

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
  <motion.h1
    :initial="{ y: 20, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
    class="text-2xl text-highlighted font-bold"
  >
    {{ t("projects.title") }}
  </motion.h1>
  <motion.p
    :initial="{ y: 15, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.3 }"
    class="text-muted mb-3"
  >
    {{ t("projects.description") }}
  </motion.p>

  <!-- Tags filter -->
  <motion.div
    v-if="tags.length > 0"
    :initial="{ y: 15, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.6 }"
    class="flex items-center gap-2 mb-4"
  >
    <span class="text-muted font-semibold">
      {{ t("projects.tags") }}
    </span>
    <div class="flex flex-wrap gap-1.5">
      <UBadge
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        color="neutral"
        variant="subtle"
        class="h-fit cursor-pointer rounded-full transition-colors duration-300"
        :class="selectedTags.length === 0
          ? (hoveredTag === null || hoveredTag === tag
            ? 'bg-accented/75' : 'bg-accented/25 hover:bg-accented/75')
          : (selectedTags.includes(tag)
            ? 'bg-accented/75' : 'bg-accented/25 hover:bg-accented/75')"
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
  </motion.div>

  <motion.div
    v-if="status === 'pending'"
    :initial="{ y: 15, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.7 }"
    class="grid grid-cols-1 md:grid-cols-2 gap-3"
  >
    <UCard v-for="n in initialProjectsCount" :key="n">
      <USkeleton class="h-40" />
    </UCard>
  </motion.div>

  <motion.div
    v-else-if="!projects || projects.length === 0 || !filteredProjects"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.5, delay: 0.4 }"
    class="text-muted"
  >
    {{ t("projects.empty") }}
  </motion.div>

  <motion.div
    v-else-if="filteredProjects.length === 0"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 0.5 }"
    class="text-muted"
  >
    {{ t("projects.noMatchingProjects") }}
  </motion.div>

  <div v-else>
    <!-- Initial list of initialProjectsCount projects -->
    <motion.div
      :initial="{ y: 25, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.7 }"
      class="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <AnimatePresence>
        <motion.div
          v-for="(project, index) in filteredProjects.slice(0, initialProjectsCount)"
          :key="project.id"
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :exit="{ y: -20, opacity: 0 }"
          :transition="{
            duration: 0.4,
            ease: 'easeOut',
            delay: 0.1 + (index * 0.04),
          }"
          layout
        >
          <ProjectCard
            :project="project"
            is-large-card
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>

    <!-- Other projects with a "view more" button -->
    <AnimatePresence>
      <motion.div
        v-if="displayAllProjects"
        :initial="{ y: 30, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :exit="{ y: -30, opacity: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
      >
        <AnimatePresence>
          <motion.div
            v-for="(project, index) in filteredProjects.slice(initialProjectsCount)"
            :key="`additional-${project.id}`"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: -20, opacity: 0 }"
            :transition="{
              duration: 0.4,
              ease: 'easeOut',
              delay: index * 0.04,
            }"
            layout
          >
            <ProjectCard
              :project="project"
              is-large-card
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        v-if="filteredProjects && filteredProjects.length > initialProjectsCount"
        :initial="{ y: 15, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.7 }"
        class="flex justify-center mt-4"
      >
        <UButton
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
      </motion.div>
    </animatepresence>
  </div>
</template>
