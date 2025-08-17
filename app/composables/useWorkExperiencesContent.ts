import type { AsyncDataRequestStatus } from "#app";
import type { ExperiencesCollectionItem } from "~/types/content";

/**
 * Fetch data from the Nuxt Content experiences collection, according to locale.
 * Experiences are grouped by companies, with most recent experiences first.
 *
 * @returns AsyncData containing multiple ExperiencesCollectionItem if success
 */
export function useWorkExperiencesContent(): {
  experiences: Ref<ExperiencesCollectionItem[][] | undefined>;
  status: Ref<AsyncDataRequestStatus>;
} {
  const { locale } = useI18n();
  const cacheKey = `experiences-${locale.value}`;

  /* Fetch experiences */
  const { data, status }
  = useAsyncData<ExperiencesCollectionItem[]>(cacheKey, async () => {
    return await queryCollection(`experiences_${locale.value}`)
      .all() as ExperiencesCollectionItem[];
  }, {
    watch: [locale], // re-fetch when locale changes
  });

  /* Order by most recent, with current experiences first */
  const orderedExperiences = computed<ExperiencesCollectionItem[] | undefined>(() =>
    !data.value
      ? undefined
      : data.value.sort((a, b) => { // order by most recent
          const aEnd = a.endDate ? new Date(a.endDate) : new Date();
          const bEnd = b.endDate ? new Date(b.endDate) : new Date();
          return bEnd.getTime() - aEnd.getTime();
        }).map(experience => ({ // calculate month duration
          ...experience,
          monthDuration: getExperienceMonthDuration(experience),
        })),
  );

  /* Group experiences by company, preserving experiences order */
  const groupedExperiences = computed<ExperiencesCollectionItem[][] | undefined>(() => {
    const groups = new Map<string, ExperiencesCollectionItem[]>();
    if (!orderedExperiences.value) {
      return undefined;
    }

    for (const experience of orderedExperiences.value) {
      const company = experience.company;
      if (!groups.has(company)) {
        groups.set(company, []);
      }
      groups.get(company)!.push(experience);
    }
    return Array.from(groups.values());
  });

  return { experiences: groupedExperiences, status };
}

/**
 * Get the duration in months of an experience.
 * If no endDate is given, the duration will be relative to current date.
 *
 * @param experience - The experience to get the duration for
 * @returns The duration in months, or undefined if no experience date
 */
function getExperienceMonthDuration(experience: ExperiencesCollectionItem): number | undefined {
  if (!experience.startDate && !experience.endDate) {
    return undefined;
  }

  const start = experience.startDate ? new Date(experience.startDate) : new Date();
  const end = experience.endDate ? new Date(experience.endDate) : new Date();

  return getMonthDifference(end, start);
}

/**
 * Get the difference in months between two dates.
 * @param end - The end date
 * @param start - The start date
 * @returns The difference in months, rounded down to the nearest unit
 */
function getMonthDifference(end: Date, start: Date): number {
  return Math.floor(
    (end.getFullYear() - start.getFullYear()) * 12
    + (end.getMonth() - start.getMonth()),
  );
}
