<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();

/* Fetch featured projects data */
const { data: featuredProjects } = await useProjectsContent(true);
</script>

<template>
  <motion.div
    :initial="{ y: 30, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.65, ease: 'easeOut', delay: 0.8 }"
    class="flex flex-col gap-5"
  >
    <motion.div
      :initial="{ y: 15, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 1 }"
    >
      <h1 class="text-2xl text-highlighted font-bold">
        {{ t("home.featuredProjects.title") }}
      </h1>
      <p class="text-muted">
        {{ t("home.featuredProjects.description") }}
      </p>
    </motion.div>

    <motion.div
      v-if="!featuredProjects || featuredProjects.length === 0"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.55, delay: 1.2 }"
      class="text-muted"
    >
      {{ t("home.featuredProjects.empty") }}
    </motion.div>

    <motion.div
      v-else
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.55, ease: 'easeOut', delay: 1.2 }"
      class="flex flex-col gap-5"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
          :is-large-card="false"
        />
      </div>

      <!-- Redirect to all projects button -->
      <motion.div
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.55, ease: 'easeOut', delay: 1.35 }"
      >
        <UButton
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-arrow-right"
          class="group w-fit active:translate-y-0.5 transition-transform duration-200"
          :ui="{
            trailingIcon: 'group-hover:translate-x-0.5 transition-transform duration-200',
          }"
          to="/projects"
        >
          {{ t("home.featuredProjects.viewAll") }}
        </UButton>
      </motion.div>
    </motion.div>
  </motion.div>
</template>
