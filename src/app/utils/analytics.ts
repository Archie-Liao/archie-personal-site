const STORAGE_KEY = "archie-site-analytics";

interface DayRecord {
  date: string;
  pageViews: number;
  clicks: number;
  dwellSeconds: number;
}

interface AnalyticsStore {
  days: Record<string, DayRecord>;
  totalClicks: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): AnalyticsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AnalyticsStore;
  } catch {
    /* ignore */
  }
  return { days: {}, totalClicks: 0 };
}

function save(store: AnalyticsStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function ensureDay(store: AnalyticsStore, date: string): DayRecord {
  if (!store.days[date]) {
    store.days[date] = { date, pageViews: 0, clicks: 0, dwellSeconds: 0 };
  }
  return store.days[date];
}

export function trackPageView() {
  const store = load();
  const day = ensureDay(store, todayKey());
  day.pageViews += 1;
  save(store);
}

export function trackClick() {
  const store = load();
  const day = ensureDay(store, todayKey());
  day.clicks += 1;
  store.totalClicks += 1;
  save(store);
}

export function addDwellSeconds(seconds: number) {
  const store = load();
  const day = ensureDay(store, todayKey());
  day.dwellSeconds += seconds;
  save(store);
}

export function getAnalytics() {
  return load();
}

export function getRecentDays(count = 14) {
  const store = load();
  const keys = Object.keys(store.days).sort().slice(-count);
  return keys.map((k) => store.days[k]);
}
