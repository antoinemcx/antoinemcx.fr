import type { AsyncDataRequestStatus } from "#app";
import type { EducationCollectionItem } from "~/types/content";

/**
 * Fetch data from the Nuxt Content education collection, according to locale,
 * with most recent experiences first.
 *
 * @returns AsyncData containing multiple EducationCollectionItem if success
 */
export function useEducationContent(): {
  educationItems: Ref<EducationCollectionItem[] | undefined>;
  status: Ref<AsyncDataRequestStatus>;
} {
  const { locale } = useI18n();
  const cacheKey = `education-${locale.value}`;

  /* Fetch experiences */
  const { data, status }
  = useAsyncData<EducationCollectionItem[]>(cacheKey, async () => {
    return await queryCollection(`education_${locale.value}`)
      .all() as EducationCollectionItem[];
  }, {
    watch: [locale], // re-fetch when locale changes
  });

  /* Order by most recent, with current experiences first */
  const orderedExperiences = computed<EducationCollectionItem[] | undefined>(() =>
    !data.value
      ? undefined
      : data.value.sort((a, b) => orderByMostRecent(a.endDate, b.endDate)),
  );

  return { educationItems: orderedExperiences, status };
}
