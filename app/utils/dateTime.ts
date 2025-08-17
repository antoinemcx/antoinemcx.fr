/**
 * Order two experiences by their end date, most recent first.
 * @param aEndDate - The end date of the first experience
 * @param bEndDate - The end date of the second experience
 * @returns A negative number if a is more recent than b,
 * a positive number if b is more recent than a, and 0 if they are equal
 */
export function orderByMostRecent(aEndDate?: string, bEndDate?: string): number {
  const aEnd = aEndDate ? new Date(aEndDate) : new Date();
  const bEnd = bEndDate ? new Date(bEndDate) : new Date();
  return bEnd.getTime() - aEnd.getTime();
}

/**
 * Get the difference in months between two dates.
 * @param end - The end date
 * @param start - The start date
 * @returns The difference in months, rounded down to the nearest unit
 */
export function getMonthDifference(end: Date, start: Date): number {
  return Math.floor(
    (end.getFullYear() - start.getFullYear()) * 12
    + (end.getMonth() - start.getMonth()),
  );
}
