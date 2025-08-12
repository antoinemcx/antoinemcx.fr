import type { Collections } from "@nuxt/content";
import type { AsyncData, NuxtError } from "nuxt/app";
import type { ProjectsCollectionItem } from "~/types/content";

/**
 * Fetch data from the Nuxt Content projects collection, according to locale.
 *
 * @param featuredOnly - If true, only fetch featured projects
 * @returns AsyncData containing an array of ProjectsCollectionItem if success
 */
export function useProjectsContent(
  featuredOnly: boolean = false,
): AsyncData<ProjectsCollectionItem[] | undefined, NuxtError | undefined> {
  const { locale } = useI18n();

  const cacheKey = featuredOnly // different key to force re-fetching
    ? `featured-projects-${locale.value}`
    : `all-projects-${locale.value}`;

  return useAsyncData<ProjectsCollectionItem[]>(cacheKey, async () => {
    const collection = (`projects_${locale.value}`) as keyof Collections;
    const query = queryCollection(collection);

    if (featuredOnly) {
      query.where("isFeatured", "=", true);
    }

    return await query.all() as ProjectsCollectionItem[];
  }, {
    watch: [locale], // re-fetch when locale changes
  });
}
