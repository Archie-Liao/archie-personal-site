export function getDiaryDayCount(dayOneDate: string, referenceDate = new Date()): number {
  const start = new Date(dayOneDate + "T00:00:00");
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diff = ref.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, days);
}
